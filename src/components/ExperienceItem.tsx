interface ExperienceItemProps {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  description: string;
}

function formatDateRange(start: string, end: string): string {
  const startYear = start.split('-')[0];
  const endYear = end === 'present' ? 'Present' : end.split('-')[0];
  
  if (startYear === endYear) {
    return startYear;
  }
  
  return `${startYear}–${endYear}`;
}

export default function ExperienceItem({ 
  company, 
  role, 
  start, 
  end, 
  location, 
  description 
}: ExperienceItemProps) {
  return (
    <div className="border-b border-border last:border-b-0 py-6 first:pt-0 last:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <h3 className="h3 text-text mb-1">{company}</h3>
          <p className="body text-text-subtle">{role}</p>
        </div>
        <div className="text-right text-small text-text-muted">
          <div>{formatDateRange(start, end)}</div>
          <div>{location}</div>
        </div>
      </div>
      <div 
        className="body text-text-subtle"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}