import { SiteContent } from '@/lib/content';

interface AboutPrinciplesProps {
  siteContent: SiteContent;
}


export default function AboutPrinciples({ siteContent }: AboutPrinciplesProps) {
  return (
    <section id="about" className="py-20 lg:py-20 md:py-10 border-t border-border">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8">
        
        {/* Block header */}
        <div className="grid grid-cols-1 lg:grid-cols-[4.5rem_1fr] gap-2 lg:gap-8 items-baseline mb-10 lg:mb-10">
          <div className="font-serif font-medium text-accent-500 tabular-nums text-2xl lg:text-4xl" style={{ letterSpacing: '-0.03em' }}>
            III
          </div>
          <h2 className="font-serif font-medium text-text text-3xl lg:text-5xl leading-tight" style={{ letterSpacing: '-0.02em' }} dangerouslySetInnerHTML={{ __html: siteContent.sectionTitles.about }}></h2>
        </div>

        {/* Block body */}
        <div className="lg:pl-28">
          
          {/* About copy */}
          <div className="max-w-2xl mb-14">
            <div 
              className="text-text-subtle space-y-5 [&>p:first-child]:text-lg [&>p:first-child]:leading-relaxed [&>p]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: siteContent.aboutContent }}
            />
          </div>

          {/* Principles section */}
          <div>
            <div 
              className="font-semibold uppercase text-accent-500 mb-4 text-xs"
              style={{ letterSpacing: '0.1em' }}
            >
              {siteContent.labels.principlesHeader}
            </div>

            {/* Principles grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 border-l border-r border-border">
              {siteContent.principles.map((principle, index) => (
                <div 
                  key={principle.number}
                  className={`border-t border-border p-7 lg:p-7 ${
                    index < siteContent.principles.length - 1 ? 'lg:border-r lg:border-border' : ''
                  }`}
                >
                  <div className="font-serif font-medium text-accent-500 tabular-nums text-3xl lg:text-3xl mb-4">
                    {principle.number}
                  </div>
                  <h4 className="font-serif font-medium text-text mb-2 text-xl" style={{ letterSpacing: '-0.01em' }}>
                    {principle.title}
                  </h4>
                  <p className="text-text-subtle text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}