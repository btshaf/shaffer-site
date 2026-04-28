# bshaffer.co

Editorial index portfolio site built with Next.js 16.2.4, featuring a magazine-style design and professional contact system.

## ✨ Features
- 📰 **Editorial Index Design** - Magazine-style homepage with masthead, TOC, and back-page contact
- 📱 **Fully Responsive** - Desktop inline navigation with rich mobile menu
- 📧 **Professional Contact Form** - Dark-themed form with validation and email delivery
- ⚡ **Dynamic Content** - Markdown-based case studies and experience with dynamic counting
- 🎨 **Custom Design System** - Olive Bronze v2 with dark mode accent colors
- 📊 **Built-in Protection** - Spam filtering, rate limiting, and accessibility compliance

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
- `/content/site.md` - Editorial hero, domains, contact sections, and about content
- `/content/experience/` - Work experience entries (rendered as 4-column ledger)
- `/content/case-studies/` - Portfolio case studies (rendered as numbered TOC)

### Editorial Index Structure
The redesigned homepage follows an editorial magazine layout:
1. **EditorialHero** - Masthead with issue line and colophon
2. **DomainStrip** - Horizontal band of expertise domains  
3. **CaseStudyTOC** - Numbered table-of-contents for case studies
4. **ExperienceLedger** - Four-column experience timeline
5. **AboutPrinciples** - About copy with 4-up principles grid
6. **ContactBackPage** - Dark contact section with form and "Find me elsewhere" links

## Contact Form

The dark-themed contact form includes:
- ✅ **Editorial Design** - Dark background with custom underline inputs  
- ✅ **Professional Delivery** - Via Resend to Gmail
- ✅ **Accessibility Compliant** - WCAG AA contrast ratios and proper labels
- ✅ **Spam Protection** - Honeypot and keyword filtering
- ✅ **Rate Limiting** - 10 requests per 10 minutes per IP
- ✅ **iOS Optimization** - 16px font minimum to prevent zoom
- ✅ **Success States** - Form replacement with styled confirmation card

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
