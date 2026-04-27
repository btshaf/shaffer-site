import { ExperienceEntry } from "@/lib/content";
import ExperienceItem from "./ExperienceItem";

interface ExperienceListProps {
  experiences: ExperienceEntry[];
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <section id="work" className="section max-w-4xl mx-auto px-6">
      <div className="section-header">
        <div className="tiny">Experience</div>
        <h2 className="h1">Where I've built things.</h2>
      </div>
      
      <div className="max-w-3xl">
        {experiences.map((experience, index) => (
          <ExperienceItem
            key={`${experience.company}-${index}`}
            company={experience.company}
            role={experience.role}
            start={experience.start}
            end={experience.end}
            location={experience.location}
            description={experience.description}
          />
        ))}
      </div>
    </section>
  );
}