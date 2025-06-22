import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { generateInvoicePdf } from '@/lib/generateInvoice'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const { email, name, orderDetails, orderId } = body

    const invoiceBase64 = await generateInvoicePdf(orderId, email, orderDetails, body.deliveryCharge)


    const invoiceAttachment = {
      filename: `invoice-${orderId}.pdf`,
      content: invoiceBase64,
      contentType: 'application/pdf',
    }

    // 1. Send email to customer
    await resend.emails.send({
      from: 'orders@hmcement.com',
      to: email,
      subject: 'Your Order with H&M Cement',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your order. Here is your invoice and summary:</p>
        <pre style="background:#f4f4f4;padding:10px;border-radius:5px;">${orderDetails}</pre>
        <p>We'll verify your payment and deliver your order soon.</p>
        <p>Regards,<br/>H&M Cement Team</p>
      `,
      attachments: [invoiceAttachment],
    })

    // 2. Send notification to admin
    await resend.emails.send({
      from: 'orders@hmcement.com',
      to: 'your-email@hmcement.com', // replace with actual admin email
      subject: '📦 New Cement Order Received!',
      html: `
        <p><strong>New order from ${name} (${email})</strong></p>
        <p>Order ID: ${orderId}</p>
        <p>Details:</p>
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
