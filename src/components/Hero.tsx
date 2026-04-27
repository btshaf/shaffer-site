interface HeroProps {
  eyebrow: string;
  headline: string;
  bio: string;
  resumeUrl: string;
  email: string;
}

export default function Hero({ eyebrow, headline, bio, resumeUrl }: HeroProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
      <div className="max-w-3xl">
        {/* Eyebrow */}
        <div className="tiny text-accent-500 mb-4">
          {eyebrow}
        </div>
        
        {/* Display headline */}
        <h1 className="display-lg text-text mb-6">
          {headline}
        </h1>
        
        {/* Bio paragraph */}
        <p className="body-lg text-text-subtle mb-8 max-w-2xl">
          {bio}
        </p>
        
        {/* CTA buttons */}
        <div className="button-row">
          <a 
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View resume
          </a>
          <a 
            href="#contact"
            className="btn btn-secondary"
          >
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}