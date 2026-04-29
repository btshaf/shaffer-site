import { SiteContent } from '@/lib/content';

interface DomainStripProps {
  siteContent: SiteContent;
}

export default function DomainStrip({ siteContent }: DomainStripProps) {
  return (
    <section className="bg-bg-subtle border-b border-border py-6 lg:py-6">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          
          {/* Eyebrow */}
          <div 
            className="font-semibold uppercase text-text-muted tracking-widest mb-1 md:mb-0"
            style={{ 
              fontSize: '0.6875rem', 
              letterSpacing: '0.1em' 
            }}
          >
            {siteContent.labels.domainsHeader}
          </div>
          
          {/* Pills */}
          <div className="flex flex-wrap gap-1.5">
            {siteContent.domains.map((domain, index) => (
              <span 
                key={index}
                className="border border-border-strong rounded-full px-2.5 py-1 bg-transparent text-text-muted font-semibold uppercase tracking-wider"
                style={{ 
                  fontSize: '0.6875rem',
                  letterSpacing: '0.06em'
                }}
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}