import { ExperienceEntry } from '@/lib/content';

interface ExperienceLedgerProps {
  experience: ExperienceEntry[];
}

export default function ExperienceLedger({ experience }: ExperienceLedgerProps) {
  return (
    <section id="experience" className="py-20 lg:py-20 md:py-10 border-t border-border">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8">
        
        {/* Block header */}
        <div className="grid grid-cols-1 lg:grid-cols-[4.5rem_1fr] gap-2 lg:gap-8 items-baseline mb-10 lg:mb-10">
          <div className="font-serif font-medium text-accent-500 tabular-nums text-2xl lg:text-4xl" style={{ letterSpacing: '-0.03em' }}>
            II
          </div>
          <h2 className="font-serif font-medium text-text text-3xl lg:text-5xl leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Where I've <em className="italic text-text-subtle font-normal">built.</em>
          </h2>
        </div>

        {/* Block body */}
        <div className="lg:pl-28">
          
          {/* Desktop ledger */}
          <div className="hidden lg:block font-mono text-sm">
            {experience.map((exp, index) => (
              <div 
                key={exp.order}
                className={`grid grid-cols-[7rem_1fr_1.25fr_10rem] gap-4 py-3.5 items-baseline ${
                  index === 0 ? 'border-t border-border-strong' : 'border-t border-dashed border-border'
                }`}
              >
                <div className="text-text-muted tabular-nums">
                  {exp.start}–{exp.end}
                </div>
                <div className="font-serif font-medium text-text text-xl" style={{ letterSpacing: '-0.01em' }}>
                  {exp.company}
                </div>
                <div className="font-sans text-text-subtle" style={{ fontSize: '0.9375rem' }}>
                  {exp.role}
                </div>
                <div className="font-sans text-text-muted text-right text-xs">
                  {exp.location}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile stacked cards */}
          <div className="lg:hidden space-y-0 divide-y divide-border">
            {experience.map((exp, index) => (
              <div 
                key={exp.order}
                className={`py-4.5 ${index === 0 ? 'border-t border-border-strong' : ''}`}
              >
                <div className="font-mono uppercase text-text-muted text-xs tracking-wider mb-0.5" style={{ letterSpacing: '0.08em' }}>
                  {exp.start}–{exp.end}
                </div>
                <div className="font-serif font-medium text-text text-xl mb-1">
                  {exp.company}
                </div>
                <div className="font-sans text-text-subtle text-base mb-0.5">
                  {exp.role}
                </div>
                <div className="font-sans text-text-muted text-xs">
                  {exp.location}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}