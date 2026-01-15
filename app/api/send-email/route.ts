import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Validate environment variables
const validateEmailConfig = () => {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'SENDER_EMAIL']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    return {
      valid: false,
      error: `Missing email configuration: ${missing.join(', ')}`
    }
  }
  
  return { valid: true }
}

// Rate limiting map (simple in-memory, consider Redis for production)
const rateLimitMap = new Map<string, number[]>()

const checkRateLimit = (ip: string, maxRequests = 5, windowMs = 3600000) => {
  const now = Date.now()
  const userRequests = rateLimitMap.get(ip) || []
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(time => now - time < windowMs)
  
  if (recentRequests.length >= maxRequests) {
    return { allowed: false, message: 'Too many requests. Please try again later.' }
  }
  
  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)
  
  return { allowed: true }
}

const sanitizeInput = (input: string): string => {
  return input.trim().slice(0, 1000) // Limit length and trim
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const rateLimit = checkRateLimit(ip)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, message: rateLimit.message },
        { status: 429 }
      )
    }

    // Validate environment variables
    const config = validateEmailConfig()
    if (!config.valid) {
      console.error(config.error)
      return NextResponse.json(
        { success: false, message: 'Email service is not properly configured' },
        { status: 500 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters' },
        { status: 400 }
      )
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedSubject = sanitizeInput(subject)
    const sanitizedMessage = sanitizeInput(message)

    // Email to admin
    const adminMailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL, // Send to yourself
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(sanitizedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(sanitizedEmail)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(sanitizedSubject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(sanitizedMessage).replace(/\n/g, '<br>')}</p>
      `,
      replyTo: sanitizedEmail,
    }

    // Reply email to user
    const replyMailOptions = {
      from: process.env.SENDER_EMAIL,
      to: sanitizedEmail,
      subject: 'Thank you for contacting me',
      html: `
        <h2>Thank you, ${escapeHtml(sanitizedName)}!</h2>
        <p>I received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${escapeHtml(sanitizedSubject)}</p>
        <p>Best regards,<br>Salwyn Christopher</p>
      `,
    }

    // Send emails
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(replyMailOptions)

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email send error:', error)
    
    // Log detailed error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Full error:', error)
    }

    return NextResponse.json(
      { success: false, message: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
