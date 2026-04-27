import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting (for production, use Redis or database)
const submissions = new Map<string, number[]>();

const RATE_LIMIT = {
  maxRequests: 3,
  windowMs: 15 * 60 * 1000, // 15 minutes
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
  const { name, email, subject, message } = data;
  
  // Basic spam checks
  if (!name || !email || !subject || !message) {
    return true;
  }
  
  // Check for excessive links
  const linkCount = (message.match(/https?:\/\//g) || []).length;
  if (linkCount > 2) {
    return true;
  }
  
  // Check for suspicious keywords
  const spamKeywords = ['cialis', 'viagra', 'casino', 'lottery', 'crypto', 'bitcoin', 'investment'];
  const text = (name + ' ' + email + ' ' + subject + ' ' + message).toLowerCase();
  if (spamKeywords.some(keyword => text.includes(keyword))) {
    return true;
  }
  
  // Check for reasonable message length
  if (message.length < 10 || message.length > 2000) {
    return true;
  }
  
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    const data = await request.json();
    
    // Spam detection
    if (isSpam(data)) {
      return NextResponse.json(
        { error: 'Message appears to be spam.' },
        { status: 400 }
      );
    }
    
    const { name, email, subject, message } = data;
    
    // For now, just log the message (in production, send email via service like SendGrid, Resend, etc.)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      ip,
      name,
      email,
      subject,
      message: message.substring(0, 200) + (message.length > 200 ? '...' : '')
    });
    
    // TODO: Send email notification to your actual email address
    // You would integrate with a service like:
    // - Resend: https://resend.com
    // - SendGrid: https://sendgrid.com
    // - NodeMailer with your email provider
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}