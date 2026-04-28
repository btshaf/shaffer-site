# bshaffer.co

Personal portfolio site built with Next.js 16.2.4, featuring a fully functional contact form and professional email system.

## ✨ Features
- 📱 Responsive portfolio design
- 📧 Professional contact form with email delivery
- ⚡ Fast static generation with dynamic contact API
- 🎨 Custom design system with Tailwind CSS
- 📊 Built-in spam protection and rate limiting

## Tech Stack
- **Framework**: Next.js 16.2.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Content**: Markdown-based content management
- **Email**: Resend integration with professional templates
- **Hosting**: Vercel deployment with serverless functions
- **DNS**: Cloudflare Email Routing

## Getting Started

### Prerequisites
- Node.js 18+
- Resend account (for contact form)

### Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your RESEND_API_KEY to .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Setup
Create `.env.local` with:
```bash
RESEND_API_KEY=your_resend_api_key
TO_EMAIL=your_email@example.com
```

## Content Management

Content is managed through Markdown files in the `/content` directory:
- `/content/site.md` - Hero and about sections
- `/content/experience/` - Work experience entries
- `/content/case-studies/` - Portfolio case studies

## Contact Form

The site includes a fully functional contact form with:
- ✅ **Professional email delivery** via Resend
- ✅ **Spam protection** with honeypot and keyword filtering
- ✅ **Rate limiting** (10 requests per 10 minutes per IP)
- ✅ **Professional HTML email templates**
- ✅ **Direct Gmail delivery** for reliable receipt

### API Endpoint
- `POST /api/contact` - Handles contact form submissions
- Rate limited and spam protected
- Sends professional email notifications

## Deployment

**Live Site**: [https://bshaffer.co](https://bshaffer.co)

Deployed via Vercel with:
- ✅ Automatic builds on push to main
- ✅ Environment variables configured
- ✅ Custom domain with SSL
- ✅ Serverless contact form API
- ✅ Professional email delivery system

### Production Configuration
- **Domain**: `bshaffer.co` (primary)
- **Email**: Contact forms delivered to Gmail
- **Performance**: Static generation + serverless API
- **Security**: Rate limiting and spam protection

For detailed deployment instructions, see `DEPLOYMENT.md`.
