import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { generateInvoicePdf } from '@/lib/generateInvoice'

const resend = new Resend(process.env.RESEND_API_KEY!) // ✅ use ENV variable correctly

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const { email, name, orderDetails } = body

    // ✅ Generate PDF invoice and encode to Base64
    const pdfBase64 = await generateInvoicePdf(email, orderDetails)

    // ✅ Send email to customer with invoice
    await resend.emails.send({
      from: 'orders@hmcement.com',
      to: email,
      subject: 'Your Order with H&M Cement',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your order. Your invoice is attached.</p>
        <p>Regards,<br/>H&M Cement Team</p>
      `,
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfBase64,
        },
      ],
    })

    // ✅ Send internal notification to admin
    await resend.emails.send({
      from: 'orders@hmcement.com',
      to: 'hadikhan2003@gmail.com', // ✅ Replace with your actual admin email
      subject: '📦 New Cement Order Received!',
      html: `
        <p><strong>New order from ${name} (${email})</strong></p>
        <p>Details:</p>
        <pre style="background:#f4f4f4;padding:10px;border-radius:5px;">${orderDetails}</pre>
      `,
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfBase64,
        },
      ],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Email send error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
