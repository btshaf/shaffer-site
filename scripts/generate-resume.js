const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Design system colors and fonts matching globals.css
const designSystem = {
  colors: {
    bg: '#F0EEE6',
    surface: '#FFFFFF',
    text: '#1A1810',
    textMuted: '#6B6750',
    textSubtle: '#4A4317',
    accent: '#4A4317',
    border: '#DEDBCB'
  },
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    serif: 'Fraunces, serif'
  }
};

const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Brad Shaffer - Resume</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: ${designSystem.fonts.sans};
      background: ${designSystem.colors.bg};
      color: ${designSystem.colors.text};
      line-height: 1.3;
      font-size: 11px;
      padding: 20px;
    }
    
    .resume {
      max-width: 8.5in;
      margin: 0 auto;
      background: ${designSystem.colors.surface};
      padding: 25px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .header {
      text-align: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid ${designSystem.colors.border};
    }
    
    .name {
      font-family: ${designSystem.fonts.serif};
      font-size: 32px;
      font-weight: 500;
      color: ${designSystem.colors.text};
      margin-bottom: 6px;
      letter-spacing: -0.02em;
    }
    
    .title {
      font-size: 16px;
      color: ${designSystem.colors.textSubtle};
      font-weight: 500;
      margin-bottom: 12px;
    }
    
    .contact {
      font-size: 14px;
      color: ${designSystem.colors.textMuted};
    }
    
    .contact a {
      color: ${designSystem.colors.accent};
      text-decoration: none;
    }
    
    .section {
      margin-bottom: 18px;
    }
    
    .section-title {
      font-family: ${designSystem.fonts.serif};
      font-size: 20px;
      font-weight: 500;
      color: ${designSystem.colors.accent};
      margin-bottom: 15px;
      letter-spacing: -0.01em;
    }
    
    .summary {
      font-size: 14px;
      line-height: 1.5;
      color: ${designSystem.colors.textSubtle};
      margin-bottom: 25px;
    }
    
    .experience-item {
      margin-bottom: 15px;
      page-break-inside: avoid;
    }
    
    .role-header {
      margin-bottom: 8px;
    }
    
    .role-title {
      font-size: 16px;
      font-weight: 600;
      color: ${designSystem.colors.text};
      margin-bottom: 3px;
    }
    
    .company-info {
      font-size: 12px;
      color: ${designSystem.colors.textMuted};
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 600;
    }
    
    .role-description {
      font-size: 12px;
      line-height: 1.4;
      color: ${designSystem.colors.text};
    }
    
    .bullet-list {
      margin: 6px 0;
      padding-left: 14px;
    }
    
    .bullet-item {
      margin-bottom: 4px;
      font-size: 12px;
      line-height: 1.3;
    }
    
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 15px;
    }
    
    .skill {
      background: ${designSystem.colors.bg};
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
      color: ${designSystem.colors.textSubtle};
      border: 1px solid ${designSystem.colors.border};
    }
    
    @media print {
      body {
        padding: 0;
        background: white;
      }
      
      .resume {
        box-shadow: none;
        max-width: none;
        margin: 0;
        padding: 40px;
      }
    }
  </style>
</head>
<body>
  <div class="resume">
    <div class="header">
      <h1 class="name">Brad Shaffer</h1>
      <div class="title">Senior Product Manager</div>
      <div class="contact">
        brad.t.shaffer@gmail.com • 602-363-0224 • Greater Phoenix, Arizona • <a href="https://linkedin.com/in/bradshaffer">linkedin.com/in/bradshaffer</a>
      </div>
    </div>
    
    <div class="section">
      <div class="summary">
        Senior product manager with 10+ years building B2B products at the seam where operational software meets financial and operational data. Strongest at B2B SaaS, marketplaces, and vertical software where the company has shipped product but the foundational problems are still being solved, and where the work has a direct line to revenue. Track record of shipping financial data products, operator-facing tooling, and activation surfaces that have generated $70M+ in measurable impact across roles at Square, Weebly, Infusionsoft, and Gierd.
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Experience</h2>
      
      <div class="experience-item">
        <div class="role-header">
          <div class="role-title">Senior Product Manager</div>
          <div class="company-info">Gierd • September 2025 – April 2026 • Remote</div>
        </div>
        <div class="role-description">B2B SaaS marketplace orchestration platform serving enterprise sellers across seven marketplaces including Amazon, eBay, and Walmart.</div>
        <ul class="bullet-list">
          <li class="bullet-item">Rebuilt binary ledger into multi-state transaction system that normalized cost and revenue across seven marketplaces, returning ~80 hours monthly to financial users at ~50 enterprise customers including AT&T, Verizon, and Acer</li>
          <li class="bullet-item">Built variance-tracked transaction records with export formatting optimized for direct import, eliminating manual reformatting step for finance teams</li>
          <li class="bullet-item">Layered AI anomaly detection on normalized ledger to surface negative-margin exposure, enabling early users to reallocate inventory toward positive-margin channels</li>
          <li class="bullet-item">Introduced RICE-based prioritization and built Gierd's first structured delivery process across 20-person product council</li>
        </ul>
      </div>
      
      <div class="experience-item">
        <div class="role-header">
          <div class="role-title">Senior Product Manager</div>
          <div class="company-info">InfiniteChoice • 2023 – 2025 • Remote</div>
        </div>
        <div class="role-description">B2C travel and events platform with 11.8M annual visits and $1.5B in bookings.</div>
        <ul class="bullet-list">
          <li class="bullet-item">Rebuilt marketing A/B testing into product-led experimentation system with revenue-potential prioritization and groomed testing backlog, running 12+ disciplined single-variable experiments quarterly</li>
          <li class="bullet-item">Redesigned mobile checkout to surface fees and pricing transparently, improving checkout conversion 41% (2.9% to 4.1%) and generating ~$22M in incremental annualized revenue</li>
          <li class="bullet-item">Redesigned "no availability" experience to surface nearby hotels with confirmed availability, converting 30% of previously lost users and recovering ~$14M in annual bookings</li>
        </ul>
      </div>
      
      <div class="experience-item">
        <div class="role-header">
          <div class="role-title">Product Lead</div>
          <div class="company-info">Solo Global • 2022 – 2023 • Remote</div>
        </div>
        <div class="role-description">Fintech startup providing banking and business tools for solopreneurs. 0-to-1 with no shipped product at time of hire.</div>
        <ul class="bullet-list">
          <li class="bullet-item">Designed category-personalized rewards program around spend concentration rather than partner subsidies; shipped program with debit card to 1,000+ users in closed beta with 15% concentration validating 2% cash back model</li>
        </ul>
      </div>
      
      <div class="experience-item">
        <div class="role-header">
          <div class="role-title">Senior Product Manager, Buyer Experience</div>
          <div class="company-info">Square • 2019 – 2022 • Remote</div>
        </div>
        <div class="role-description">Public fintech company serving SMBs worldwide.</div>
        <ul class="bullet-list">
          <li class="bullet-item">Rebuilt Square Online checkout from ground up through full redesign and disciplined A/B testing, generating $24M in incremental processed payments</li>
          <li class="bullet-item">Built and launched Square Pay stored payment wallet that grew to 5M customers and supported $300M in transaction volume over 18 months</li>
          <li class="bullet-item">Recommended killing Square Pay cross-platform expansion, saving estimated 24+ engineer-months by identifying tap-to-pay adoption outrunning QR-based wallet UX</li>
        </ul>
      </div>
      
      <div class="experience-item">
        <div class="role-header">
          <div class="role-title">Product Manager</div>
          <div class="company-info">Weebly (Acquired by Square) • 2017 – 2019 • Scottsdale, AZ</div>
        </div>
        <div class="role-description">E-commerce platform serving small business sellers, acquired by Square in 2018.</div>
        <ul class="bullet-list">
          <li class="bullet-item">Built ML-powered self-service experience surfacing three most likely help articles based on seller behavior, increasing self-service resolution 16% and reducing annual support cost ~$1M</li>
          <li class="bullet-item">Rebuilt CS internal tooling around agent workflows with ML-powered call prediction and upsell surfacing, lifting upsell conversion to 25%, reducing AHT to 8 minutes, generating ~$1.2M incremental annual revenue</li>
        </ul>
      </div>
      
      <div class="experience-item">
        <div class="role-header">
          <div class="role-title">Product Manager</div>
          <div class="company-info">Infusionsoft • 2014 – 2017 • Chandler, AZ</div>
        </div>
        <div class="role-description">SaaS CRM and marketing automation platform for small businesses.</div>
        <ul class="bullet-list">
          <li class="bullet-item">Redesigned three-tier onboarding around immediate time savings and business scalability, lifting CSAT 42% and generating $9M annualized revenue through customer mix shift</li>
          <li class="bullet-item">Shipped pre-send check and send accelerator for automation builder, reducing time to first campaign from 65 to 42 days and lifting builder adoption 18%</li>
        </ul>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Education</h2>
      <div class="experience-item">
        <div class="role-header">
          <div class="role-title">Entrepreneurship and Small Business Management</div>
          <div class="company-info">Indiana University • Bloomington, IN</div>
        </div>
      </div>
      <div class="experience-item">
        <div class="role-header">
          <div class="role-title">Information Technology</div>
          <div class="company-info">UMass Lowell • Lowell, MA</div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Core Competencies</h2>
      <div class="skills">
        <span class="skill">B2B SaaS Product Management</span>
        <span class="skill">Financial Data Products</span>
        <span class="skill">Marketplace and Vertical Software</span>
        <span class="skill">Operator-facing Tooling</span>
        <span class="skill">A/B Testing and Experimentation</span>
        <span class="skill">0-to-1 Product Development</span>
        <span class="skill">Onboarding and Activation</span>
      </div>
    </div>
  </div>
</body>
</html>
`;

async function generateResumePDF() {
  console.log('🚀 Generating resume PDF...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    await page.setContent(resumeHTML);
    
    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');
    
    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.4in',
        right: '0.4in',
        bottom: '0.4in',
        left: '0.4in'
      }
    });
    
    const publicDir = path.join(__dirname, '..', 'public');
    const pdfPath = path.join(publicDir, 'Shaffer Brad - Resume - Product.pdf');
    
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(pdfPath, pdf);
    
    console.log('✅ Resume PDF generated successfully at:', pdfPath);
    console.log('📄 PDF will be available at: /Shaffer Brad - Resume - Product.pdf');
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
  } finally {
    await browser.close();
  }
}

// Run the generator
generateResumePDF();