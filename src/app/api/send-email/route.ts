import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { generateInvoicePdf } from '@/lib/generateInvoice'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const { email, name, phone, orderDetails, orderId, deliveryCharge } = body

    const invoiceBase64 = await generateInvoicePdf(
      orderId,
      name,
      phone,
      email,
      orderDetails,
      deliveryCharge
    )

    const invoiceAttachment = {
      filename: `invoice-${orderId}.pdf`,
      content: Buffer.from(invoiceBase64, 'base64'), // ✅ FIXED
      contentType: 'application/pdf',
    }

    // ✅ Send to customer
    await resend.emails.send({
      from: 'orders@hmcement.com',
      to: email,
      subject: 'Your Order with H&M Cement',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your order. Here is your invoice and summary:</p>
        <pre style="background:#f4f4f4;padding:10px;border-radius:5px;">${orderDetails}</pre>
        <p>We will verify your payment and deliver your order soon.</p>
        <p>For questions, contact us at 0300-4013971.</p>
        <p>Regards,<br/>H&M Cement Team</p>
      `,
      attachments: [invoiceAttachment],
    })

    // ✅ Send to admin
    await resend.emails.send({
      from: 'orders@hmcement.com',
      to: 'admin@hmcement.com',
      subject: '📦 New Cement Order Received!',
      html: `
        <p><strong>New order received:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Order ID:</strong> ${orderId}</li>
          <li><strong>Delivery Charges:</strong> ${deliveryCharge}</li>
        </ul>
        <p><strong>Order Details:</strong></p>
        <pre style="background:#f4f4f4;padding:10px;border-radius:5px;">${orderDetails}</pre>
      `,
      attachments: [invoiceAttachment],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Email send error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
