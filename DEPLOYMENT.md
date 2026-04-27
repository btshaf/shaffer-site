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
No environment variables required for this static site.

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
- [ ] Verify bshaffer.co loads correctly
- [ ] Verify bradshaffer.me redirects to bshaffer.co
- [ ] Test mobile responsiveness
- [ ] Verify OG image displays in social shares
- [ ] Check Vercel Analytics is tracking visits
- [ ] Test all anchor links work correctly
- [ ] Verify favicon displays correctly