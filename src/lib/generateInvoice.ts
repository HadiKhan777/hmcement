import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function generateInvoicePdf(email: string, orderDetails: string) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 750])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

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
  drawText('H&M Cement - Order Invoice', 50, cursorY, 18)
  cursorY -= 30
  drawText(`Customer: ${email}`, 50, cursorY)
  cursorY -= 20
  drawText(`Date: ${new Date().toLocaleString()}`, 50, cursorY)
  cursorY -= 30
  drawText('Order Summary:', 50, cursorY)
  cursorY -= 20

  orderDetails.split('\n').forEach((line) => {
    drawText(line, 60, cursorY)
    cursorY -= 16
  })

  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes).toString('base64')
}
