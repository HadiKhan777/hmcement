import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { readFile } from 'fs/promises'
import path from 'path'

export async function generateInvoicePdf(
  orderId: string,
  name: string,
  phone: string,
  email: string,
  orderDetails: string,
  deliveryCharge: number
) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 780])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // ✅ Load favicon
  const faviconPath = path.resolve(process.cwd(), 'public/favicon.png')
  const faviconBytes = await readFile(faviconPath)
  const faviconImage = await pdfDoc.embedPng(faviconBytes)
  const faviconDims = faviconImage.scale(0.15)

  const logoX = 50
  const logoY = 720
  const titleX = logoX + faviconDims.width + 10

  page.drawImage(faviconImage, {
    x: logoX,
    y: logoY,
    width: faviconDims.width,
    height: faviconDims.height,
  })

  const drawText = (text: string, x: number, y: number, size = 12) => {
    page.drawText(text.replace(/₨/g, 'Rs.'), {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    })
  }

  drawText('H&M Company - Order Invoice', titleX, logoY + 5, 18)

  let y = logoY - 30

  drawText(` Order ID: ${orderId}`, 50, y); y -= 18
  drawText(` Email: ${email}`, 50, y); y -= 18
  drawText(` Name: ${name}`, 50, y); y -= 18
  drawText(` Phone: ${phone}`, 50, y); y -= 18
  drawText(` Date: ${new Date().toLocaleString()}`, 50, y); y -= 18
  drawText(` Company WhatsApp: 0300-4013971`, 50, y); y -= 30

  drawText(' Order Summary:', 50, y, 14); y -= 24

  drawText('Product', 50, y)
  drawText('Qty', 300, y)
  drawText('Total Price', 400, y)
  y -= 16

  const lines = orderDetails.split('\n').filter(Boolean)
  let Total = 0

  for (const line of lines) {
    if (/^Delivery:|^Total:/i.test(line)) continue

    const match = line.match(/(.+?) × (\d+) = Rs\.?(\d+)/)
    if (match) {
      const [, productName, qty, total] = match
      drawText(productName.trim(), 50, y)
      drawText(qty, 310, y)
      drawText(`Rs.${total}`, 400, y)
      Total += parseInt(total)
      y -= 16
    } else {
      drawText(line, 50, y)
      y -= 16
    }

    if (y < 80) break
  }

  y -= 20

  // ✅ Delivery Charge Line
  drawText(`Delivery Charge: Rs.${deliveryCharge}`, 50, y)
  y -= 18

  // ✅ Grand Total Line (fixes ESLint cartTotal issue)
  drawText(`Grand Total: Rs.${Total + deliveryCharge}`, 50, y, 14)

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes).toString('base64')
}
