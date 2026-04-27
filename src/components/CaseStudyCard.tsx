import { CaseStudy } from "@/lib/content";
import MetricCard from "./MetricCard";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const isComingSoon = caseStudy.status === 'coming-soon';
  
  return (
    <div className={`bg-surface border border-border rounded-md p-6 flex flex-col h-full ${isComingSoon ? 'opacity-60' : ''}`}>
      {/* Header */}
      <div className="mb-4">
        <div className="tiny text-text-muted mb-2">
          {caseStudy.company} · {caseStudy.period}
        </div>
        <h3 className="h3 text-text mb-3">{caseStudy.title}</h3>
        <div 
          className="body text-text-subtle"
          dangerouslySetInnerHTML={{ __html: caseStudy.summary }}
        />
      </div>
      
      {/* Spacer to push metrics and CTA to bottom */}
      <div className="flex-grow"></div>
      
      {/* Metrics */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-6 md:grid-cols-1 md:gap-2">
          {caseStudy.metrics.map((metric, index) => (
            <MetricCard
              key={index}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
            />
          ))}
        </div>
      )}
      
      {/* CTA */}
      <div className="pt-4 border-t border-border">
        {isComingSoon ? (
          <div className="text-text-muted small">Coming soon</div>
        ) : (
          <a 
            href="#" 
            className="btn btn-ghost text-sm"
          >
            Read case study
          </a>
        )}
      </div>
    </div>
  );
}