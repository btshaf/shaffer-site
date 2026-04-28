import { CaseStudy } from '@/lib/content';

interface CaseStudyTOCProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyTOC({ caseStudies }: CaseStudyTOCProps) {
  const count = caseStudies.length;
  const countLabels = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  const countLabel = count === 1 ? 'One case study' : `${countLabels[count - 1] || count} case studies`;
  const pageRange = count > 1 ? `Pp. 01–${count.toString().padStart(2, '0')}` : 'P. 01';

  return (
    <section id="case-studies" className="py-20 lg:py-20 md:py-10">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8">
        
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between border-b border-border-strong pb-5 mb-0">
          <h2 className="font-serif font-medium text-2xl text-text">
            What I've built.
          </h2>
          <span className="font-mono text-xs uppercase text-text-muted mt-2 md:mt-0" style={{ letterSpacing: '0.08em' }}>
            {countLabel} · {pageRange}
          </span>
        </div>

        {/* TOC entries */}
        <div className="divide-y divide-border">
          {caseStudies.map((study, index) => {
            const pageNum = (index + 1).toString().padStart(2, '0');
            const isComingSoon = study.status === 'coming-soon';
            const EntryTag = isComingSoon ? 'div' : 'a';
            const entryProps = isComingSoon ? {} : { href: `#` };

            return (
              <EntryTag
                key={study.order}
                {...entryProps}
                className={`
                  grid grid-cols-[2.5rem_1fr] lg:grid-cols-[4.5rem_1fr_auto_5rem] 
                  gap-4 lg:gap-8 py-5 lg:py-7 items-baseline
                  transition-all duration-300 ease-out no-underline
                  ${isComingSoon ? 'opacity-[0.55]' : 'lg:hover:pl-4 lg:hover:bg-surface-alt'}
                  ${isComingSoon ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                {/* Numeral */}
                <div className="font-serif font-medium text-accent-500 leading-none tabular-nums text-2xl lg:text-4xl self-start lg:self-baseline pt-0.5 lg:pt-0" style={{ letterSpacing: '-0.03em' }}>
                  {pageNum}
                </div>

                {/* Title block */}
                <div className="min-w-0">
                  {/* Meta line */}
                  <div className="text-text-muted uppercase font-semibold mb-1.5 text-xs" style={{ letterSpacing: '0.1em' }}>
                    {study.company} · {study.period} · {study.tag}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-serif font-medium text-text mb-1.5 lg:mb-2 max-w-2xl text-xl lg:text-3xl leading-tight lg:leading-tight" style={{ letterSpacing: '-0.015em' }}>
                    {study.title}
                  </h3>
                  
                  {/* Summary */}
                  <div className="text-text-subtle max-w-xl lg:max-w-2xl text-sm lg:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: study.summary }} />
                  
                  {/* Mobile stat display */}
                  {study.metrics && study.metrics[0] && (
                    <div className="lg:hidden flex items-baseline gap-2 mt-2.5 pt-2.5 border-t border-dashed border-border">
                      <div className="font-serif font-medium text-text text-lg tabular-nums">
                        {study.metrics[0].value}
                        <span className="text-text-muted ml-0.5 text-sm">
                          {study.metrics[0].unit}
                        </span>
                      </div>
                      <div className="text-text-muted font-semibold uppercase text-xs" style={{ letterSpacing: '0.08em' }}>
                        {study.metrics[0].label}
                      </div>
                    </div>
                  )}
                  
                  {/* Mobile coming soon badge */}
                  {isComingSoon && (
                    <div className="lg:hidden font-mono uppercase text-text-muted mt-2 text-xs" style={{ letterSpacing: '0.1em' }}>
                      Coming soon
                    </div>
                  )}
                </div>

                {/* Desktop stat column */}
                {!isComingSoon && study.metrics && study.metrics[0] && (
                  <div className="hidden lg:flex flex-col gap-2.5 text-right">
                    <div className="font-serif font-medium text-text leading-none text-3xl tabular-nums">
                      {study.metrics[0].value}
                      <span className="text-text-muted ml-0.5 text-sm">
                        {study.metrics[0].unit}
                      </span>
                    </div>
                    <div className="text-text-muted font-semibold uppercase text-xs" style={{ letterSpacing: '0.08em' }}>
                      {study.metrics[0].label}
                    </div>
                  </div>
                )}

                {/* Empty stat column for coming soon entries */}
                {isComingSoon && (
                  <div className="hidden lg:block"></div>
                )}

                {/* Desktop page number or coming soon badge */}
                <div className="hidden lg:block text-right">
                  {isComingSoon ? (
                    <div className="font-mono uppercase text-text-muted text-xs" style={{ letterSpacing: '0.1em' }}>
                      Coming soon
                    </div>
                  ) : (
                    <div className="font-mono text-text-muted border-b border-dotted border-border-strong self-baseline text-sm tabular-nums pb-1">
                      p. {pageNum}
                    </div>
                  )}
                </div>
              </EntryTag>
            );
          })}
        </div>
      </div>
    </section>
  );
}