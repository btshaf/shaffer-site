# Development Workflow

## Quick Start
```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Test production build
npm run start        # Start production server locally
npm run resume       # Generate new PDF resume
```

## Common Tasks

### Content Updates
1. **Edit Markdown files** in `/content/`
2. **SVG diagrams**: No blank lines inside `<svg>...</svg>` blocks (breaks markdown parsing)
3. **Test locally**: `npm run dev`
4. **Commit and push**: `git add . && git commit -m "Update content" && git push`
5. **Auto-deploy**: Vercel rebuilds automatically (60 seconds)

### Resume Updates
1. **Edit source**: `/docs/BradShafferResume_Master.md`
2. **Regenerate PDF**: `npm run resume`
3. **Check output**: `/public/Shaffer Brad - Resume - Product.pdf`
4. **Commit and push** to deploy

### Contact Form Changes
- **Form UI**: Edit `/src/components/ContactSection.tsx`
- **API logic**: Edit `/src/app/api/contact/route.ts`
- **Rate limits**: Modify `isRateLimited()` function
- **Test locally** before deploying

### Design System Updates
- **Components**: Edit files in `/src/components/`
- **Global styles**: Edit `/src/app/globals.css`
- **Tailwind config**: Edit `/tailwind.config.ts`
- **Document changes** in `/local-docs/design-system-v2.html`

## File Structure
```
/content/              # Markdown content (auto-parsed)
  site.md             # Hero and about content
  /experience/        # Work experience entries
  /case-studies/      # Portfolio case studies
/src/
  /app/               # Next.js App Router pages
  /components/        # React components
  /lib/content.ts     # Content parsing utilities
/local-docs/          # Documentation (not deployed)
/scripts/             # Build scripts (resume generation)
/public/              # Static assets
```

## Environment Setup
- **Node.js**: Latest LTS version
- **Package manager**: npm (package-lock.json committed)
- **GitHub CLI**: Configured for easy pushing
- **Vercel**: Connected for auto-deployment

## Deployment
- **Repository**: https://github.com/btshaf/shaffer-site
- **Production**: Auto-deploys from main branch
- **Domain**: bshaffer.co (configured in Vercel)

## Troubleshooting
- **Build failures**: Check Next.js 15 compatibility
- **Content not updating**: Clear Next.js cache (`rm -rf .next`)
- **SVG diagrams render as text**: Remove all blank lines inside `<svg>...</svg>` blocks
- **Push failures**: Re-authenticate GitHub CLI (`gh auth login`)
- **Deploy issues**: Check Vercel dashboard for build logs