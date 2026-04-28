import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend client inside the function to ensure environment variables are loaded

// Simple in-memory rate limiting (for production, use Redis or database)
const submissions = new Map<string, number[]>();

const RATE_LIMIT = {
  maxRequests: 10,
  windowMs: 10 * 60 * 1000, // 10 minutes
};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requests = submissions.get(ip) || [];
  
  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => now - timestamp < RATE_LIMIT.windowMs);
  
  if (validRequests.length >= RATE_LIMIT.maxRequests) {
    return true;
  }
  
  // Add current request
  validRequests.push(now);
  submissions.set(ip, validRequests);
  
  return false;
}

function isSpam(data: any): boolean {
  const { name, email, subject, message, company, honeypot } = data;
  
  // Honeypot check - if filled, it's a bot
  if (honeypot) {
    return true;
  }
  
  // Basic validation
  if (!name || !email || !message) {
    return true;
  }
  
  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return true;
  }
  
  // Check for excessive links
  const linkCount = (message.match(/https?:\/\//g) || []).length;
  if (linkCount > 3) {
    return true;
  }
  
  // Check for suspicious keywords
  const spamKeywords = ['cialis', 'viagra', 'casino', 'lottery', 'crypto', 'bitcoin', 'investment', 'loan', 'debt'];
  const text = (name + ' ' + email + ' ' + (subject || '') + ' ' + (company || '') + ' ' + message).toLowerCase();
  if (spamKeywords.some(keyword => text.includes(keyword))) {
    return true;
  }
  
  // Check for reasonable message length
  if (message.length < 5 || message.length > 2000) {
    return true;
  }
  
  // Check for reasonable name length
  if (name.length < 2 || name.length > 100) {
    return true;
  }
  
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Resend client with runtime environment variables
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Rate limiting
    if (isRateLimited(ip)) {
      console.log(`Rate limited IP: ${ip} at ${new Date().toISOString()}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 }
      );
    }
    
    const data = await request.json();
    console.log('Contact form submission received:', { ip, data: { ...data, honeypot: data.honeypot ? '[FILLED]' : '[EMPTY]' } });
    console.log('Environment check:', { 
      hasResendKey: !!process.env.RESEND_API_KEY, 
      keyValue: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 10) + '...' : 'undefined',
      hasToEmail: !!process.env.TO_EMAIL,
      toEmail: process.env.TO_EMAIL
    });
    
    // Spam detection
    if (isSpam(data)) {
      console.log('Spam detected from IP:', ip, 'Reason: checking spam function');
      return NextResponse.json(
        { error: 'Message appears to be spam.' },
        { status: 400 }
      );
    }
    
    const { name, email, subject, message, company } = data;
    
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 500 }
      );
    }
    
    // Send email using Resend
    try {
      const toEmail = process.env.TO_EMAIL || 'brad@bshaffer.co';
      console.log('Attempting to send email to:', toEmail);
      console.log('Resend client created:', !!resend);
      console.log('About to call resend.emails.send...');
      
      const emailResponse = await resend.emails.send({
        from: 'Portfolio Contact Form <noreply@bshaffer.co>',
        to: [toEmail],
        subject: `Portfolio Contact: ${subject || 'New Inquiry'}`,
        html: `<h1>New Contact Form Submission</h1>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Company:</strong> ${company || 'Not specified'}</p>
               <p><strong>Message:</strong></p>
               <p>${message}</p>`
      });

      console.log('Email sent successfully:', emailResponse.data?.id);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Your message has been sent successfully!' 
      });
      
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      console.error('Email error details:', JSON.stringify(emailError, null, 2));
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Reset rate limiting for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    submissions.clear();
    return NextResponse.json({ message: 'Rate limit cleared' });
  }
  
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}