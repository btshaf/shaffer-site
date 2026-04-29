import { SiteContent } from '@/lib/content';

interface EditorialHeroProps {
  siteContent: SiteContent;
}

export default function EditorialHero({ siteContent }: EditorialHeroProps) {
  return (
    <section 
      className="border-b border-border-strong py-20 lg:py-20 md:py-10"
    >
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8">
        
        {/* Issue line */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-7 md:mb-12 pb-3 md:pb-4 border-b border-border font-mono text-xs md:text-xs uppercase text-text-muted tracking-wide gap-3 md:gap-8">
          <div className="flex flex-col md:flex-row gap-1 md:gap-8">
            {siteContent.heroIssueLine.left.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-1 md:gap-8 pt-3 md:pt-0 border-t border-dashed border-border md:border-t-0">
            {siteContent.heroIssueLine.right.map((item, index) => (
              <span 
                key={index}
                className={item.includes('Available now') ? 'text-accent-500 font-semibold' : ''}
              >
                {item.includes('Available now') ? (
                  <strong>{item}</strong>
                ) : (
                  item
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-16 items-start lg:items-end">
          
          {/* Headline */}
          <div>
            <h1 
              className="font-serif font-medium text-text mb-0 text-6xl lg:text-8xl leading-[0.95] lg:leading-[0.92]"
              style={{ 
                letterSpacing: '-0.03em'
              }}
            >
              <span>The data </span>
              <em className="italic text-text-subtle font-normal">is</em>
              <span className="whitespace-nowrap"> the&nbsp;work.</span>
            </h1>
          </div>

          {/* Colophon */}
          <div className="border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
            <div className="text-text-subtle space-y-5 max-w-md">
              {siteContent.heroBioText.split('\n\n').map((paragraph, index) => (
                <p key={index} style={{ fontSize: '1.0625rem', lineHeight: '1.55' }}>
                  {paragraph.trim()}
                </p>
              ))}
            </div>
            
            <div 
              className="font-serif text-text mt-5 text-2xl font-medium"
              style={{ letterSpacing: '-0.01em' }}
            >
              {siteContent.heroColophonByline}
            </div>
            
            <div className="text-text-muted mt-1 text-sm">
              {siteContent.heroColophonRole}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}