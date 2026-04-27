import { CaseStudy } from "@/lib/content";
import CaseStudyCard from "./CaseStudyCard";

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyGrid({ caseStudies }: CaseStudyGridProps) {
  return (
    <section id="case-studies" className="section max-w-4xl mx-auto px-6">
      <div className="section-header">
        <div className="tiny">Selected Work</div>
        <h2 className="h1">Case studies & outcomes.</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((caseStudy, index) => (
          <CaseStudyCard
            key={`${caseStudy.company}-${index}`}
            caseStudy={caseStudy}
          />
        ))}
      </div>
    </section>
  );
}