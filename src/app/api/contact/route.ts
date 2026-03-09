import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface Attachment {
  filename: string
  content: string // base64 data URL
  contentType: string
}

export async function POST(request: NextRequest) {
  try {
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpSecure = process.env.SMTP_SECURE
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    const contactRecipient = process.env.CONTACT_FORM_TO_EMAIL || smtpUser

    if (
      !smtpHost ||
      !smtpPort ||
      !smtpSecure ||
      !smtpUser ||
      !smtpPass ||
      !recaptchaSecret ||
      !contactRecipient
    ) {
      return NextResponse.json(
        { error: 'Contact form is not configured on this environment.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { email, subject, message, captchaToken, attachments = [] } = body

    // Validate required fields
    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!captchaToken) {
      return NextResponse.json(
        { error: 'Verification failed' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA v3
    const recaptchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${recaptchaSecret}&response=${captchaToken}`,
      }
    )

    const recaptchaData = await recaptchaResponse.json()

    // v3 returns a score 0.0-1.0, require at least 0.3 (lenient for real users)
    if (!recaptchaData.success || (recaptchaData.score !== undefined && recaptchaData.score < 0.3)) {
      console.log('reCAPTCHA failed:', recaptchaData)
      return NextResponse.json(
        { error: 'Verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Process attachments - convert base64 data URLs to buffers
    const emailAttachments = (attachments as Attachment[]).map((att) => {
      // Remove data URL prefix (e.g., "data:image/png;base64,")
      const base64Data = att.content.split(',')[1] || att.content
      return {
        filename: att.filename,
        content: Buffer.from(base64Data, 'base64'),
        contentType: att.contentType,
      }
    })

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: smtpSecure === 'true',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    // Send email
    await transporter.sendMail({
      from: `"Props Menu Contact Form" <${smtpUser}>`,
      to: contactRecipient,
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      text: `From: ${email}\n\nSubject: ${subject}\n\n${message}${emailAttachments.length > 0 ? `\n\n[${emailAttachments.length} attachment(s)]` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          ${emailAttachments.length > 0 ? `<p><strong>Attachments:</strong> ${emailAttachments.length} file(s)</p>` : ''}
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <div style="white-space: pre-wrap;">${message}</div>
        </div>
      `,
      attachments: emailAttachments,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
