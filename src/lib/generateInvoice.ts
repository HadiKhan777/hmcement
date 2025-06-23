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
  const page = pdfDoc.addPage([600, 750])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const logoPath = path.resolve(process.cwd(), 'public/logo.png')
  const logoBytes = await readFile(logoPath)
  const logoImage = await pdfDoc.embedPng(logoBytes)
  const logoDims = logoImage.scale(0.15)

  page.drawImage(logoImage, {
    x: 440,
    y: 690,
    width: logoDims.width,
    height: logoDims.height,
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

  let cursorY = 700
  drawText('H&M Company - Order Invoice', 50, cursorY, 18)
  cursorY -= 30
  drawText(`Order ID: ${orderId}`, 50, cursorY)
  cursorY -= 20
  drawText(`Customer Email: ${email}`, 50, cursorY)
  cursorY -= 20
  drawText(`Customer Name: ${name}`, 50, cursorY)
  cursorY -= 20
  drawText(`Customer Phone: ${phone}`, 50, cursorY)
  cursorY -= 20
  drawText(`Date: ${new Date().toLocaleString()}`, 50, cursorY)
  cursorY -= 20
  drawText(`Company Phone/WhatsApp: 0300-4013971`, 50, cursorY)
  cursorY -= 30

  drawText('Order Summary:', 50, cursorY, 14)
  cursorY -= 24

  let cartTotal = 0
  const lines = orderDetails.split('\n').filter(Boolean)

  for (const line of lines) {
    if (cursorY < 80) break // Avoid writing at the very bottom
    drawText(line, 60, cursorY)
    const match = line.match(/= Rs\.?(\d+)/)
    if (match) cartTotal += parseInt(match[1])
    cursorY -= 18
  }

  const safeDeliveryCharge = typeof deliveryCharge === 'number' ? deliveryCharge : 0

  cursorY -= 20
  drawText(`Delivery: Rs.${safeDeliveryCharge}`, 60, cursorY)
  cursorY -= 20
  drawText(`Total: Rs.${cartTotal + safeDeliveryCharge}`, 60, cursorY, 14)

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes).toString('base64')
}
