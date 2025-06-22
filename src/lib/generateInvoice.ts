import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { readFile } from 'fs/promises'
import path from 'path'

export async function generateInvoicePdf(orderId: string, email: string, orderDetails: string, deliveryCharge: number) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 750])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // Load and embed the logo image
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
  drawText(`Date: ${new Date().toLocaleString()}`, 50, cursorY)
  cursorY -= 20
  drawText(`Phone/WhatsApp: 0300-4013971`, 50, cursorY)
  cursorY -= 30
  drawText('Order Summary:', 50, cursorY)
  cursorY -= 20

  let cartTotal = 0
  orderDetails.split('\n').forEach((line) => {
    drawText(line, 60, cursorY)
    const match = line.match(/= Rs\.(\d+)/)
    if (match) cartTotal += parseInt(match[1])
    cursorY -= 16
  })

  drawText(`Delivery: Rs.${deliveryCharge}`, 60, cursorY)
  cursorY -= 16
  drawText(`Total: Rs.${cartTotal + deliveryCharge}`, 60, cursorY)

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes).toString('base64')
}
