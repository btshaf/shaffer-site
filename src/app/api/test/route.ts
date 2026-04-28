import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Test endpoint called');
    console.log('Environment variables:', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      keyLength: process.env.RESEND_API_KEY?.length || 0,
      keyStart: process.env.RESEND_API_KEY?.substring(0, 5) || 'undefined',
      toEmail: process.env.TO_EMAIL || 'undefined'
    });

    // Test basic fetch to external API
    console.log('Testing basic fetch to external API...');
    const testResponse = await fetch('https://api.github.com/repos/vercel/next.js', {
      method: 'GET',
      headers: {
        'User-Agent': 'test-app'
      }
    });
    
    console.log('GitHub API response status:', testResponse.status);
    
    if (!testResponse.ok) {
      throw new Error(`GitHub API failed: ${testResponse.status}`);
    }
    
    // Test fetch to Resend API (without sending email)
    console.log('Testing Resend API connection...');
    const resendResponse = await fetch('https://api.resend.com/domains', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Resend API response status:', resendResponse.status);
    const resendText = await resendResponse.text();
    console.log('Resend API response:', resendText);

    return NextResponse.json({
      success: true,
      message: 'All tests passed',
      environment: {
        hasResendKey: !!process.env.RESEND_API_KEY,
        hasToEmail: !!process.env.TO_EMAIL,
        githubApiStatus: testResponse.status,
        resendApiStatus: resendResponse.status
      }
    });

  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { 
        error: 'Test failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}