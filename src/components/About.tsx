interface AboutProps {
  content: string;
}

export default function About({ content }: AboutProps) {
  return (
    <section id="about" className="section max-w-4xl mx-auto px-6">
      <div className="section-header">
        <div className="tiny">About</div>
        <h2 className="h1">A bit more context.</h2>
      </div>
      
      <div className="max-w-2xl">
        <div 
          className="body-lg text-text-subtle [&>p]:mb-6 [&>p:last-child]:mb-0"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}