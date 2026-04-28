# Deployment Instructions

## Prerequisites
- Vercel account
- GitHub repository
- Domain access for bshaffer.co and bradshaffer.me

## Deployment Steps

### 1. Initial Deployment
1. Push code to GitHub repository
2. Connect repository to Vercel:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure build settings

### 2. Domain Configuration
1. In Vercel project settings → Domains:
   - Add `bshaffer.co` as primary domain
   - Add `www.bshaffer.co` (will auto-redirect to apex)
   - Add `bradshaffer.me` as additional domain
   - Add `www.bradshaffer.me` as additional domain

2. Configure DNS records:
   - Point `bshaffer.co` A record to Vercel's IP
   - Point `www.bshaffer.co` CNAME to `cname.vercel-dns.com`
   - Point `bradshaffer.me` A record to Vercel's IP  
   - Point `www.bradshaffer.me` CNAME to `cname.vercel-dns.com`

### 3. Verify Configuration
- `vercel.json` handles 301 redirects from bradshaffer.me → bshaffer.co
- Vercel Analytics is automatically enabled
- SSL certificates are auto-provisioned by Vercel

### 4. Environment Variables
Contact form requires email service configuration:

#### Required Environment Variables
In Vercel project settings → Environment Variables, add:

```bash
# Resend Email Service (REQUIRED for contact form)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email delivery address (where contact forms are sent)
TO_EMAIL=brad.t.shaffer@gmail.com
```

#### Environment Setup
1. **Get Resend API Key**:
   - Sign up at [resend.com](https://resend.com)
   - Create API key in dashboard
   - Add to Vercel environment variables

2. **Domain Verification**:
   - Add domain `bshaffer.co` to Resend
   - Configure DNS records for domain verification
   - Verify SPF record includes `_spf.resend.com`

3. **Email Routing**:
   - Configure Cloudflare Email Routing for `brad@bshaffer.co`
   - Set up forwarding to Gmail address
   - Production uses direct Gmail delivery (bypasses forwarding)

### 5. Content Updates
To update content:
1. Edit Markdown files in `/content/` directory
2. Commit and push to GitHub
3. Vercel automatically rebuilds and deploys

## Build Verification
- ✅ Production build passes: `npm run build`
- ✅ Static generation works (no runtime dependencies)
- ✅ All assets generated correctly
- ✅ TypeScript compilation successful

## Post-Deployment Checklist

### Site Functionality
- [ ] Verify bshaffer.co loads correctly
- [ ] Verify bradshaffer.me redirects to bshaffer.co
- [ ] Test mobile responsiveness
- [ ] Verify OG image displays in social shares
- [ ] Check Vercel Analytics is tracking visits
- [ ] Test all anchor links work correctly
- [ ] Verify favicon displays correctly

### Contact Form & Email System
- [ ] Test contact form submission (should return success)
- [ ] Verify contact form emails arrive in Gmail inbox
- [ ] Check Resend dashboard for successful delivery
- [ ] Test spam protection (honeypot field)
- [ ] Verify rate limiting works (try multiple submissions)
- [ ] Confirm professional email template formatting
- [ ] Test reply-to functionality

### Environment & Configuration
- [ ] Verify all environment variables are set in Vercel
- [ ] Check domain verification status in Resend dashboard
- [ ] Confirm DNS records include Resend SPF
- [ ] Test Gmail sending as brad@bshaffer.co (optional)