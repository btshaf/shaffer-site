import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getPublishedCaseStudySlugs,
  getSiteContent,
  getCaseStudyMenuItems,
} from '@/lib/content';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pre-generate static params for every published case study at build time.
export async function generateStaticParams() {
  const slugs = await getPublishedCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCaseStudyBySlug(slug);
  if (!result) {
    return { title: 'Case study not found · Brad Shaffer' };
  }
  const { caseStudy } = result;
  const description = caseStudy.summary
    ? caseStudy.summary.replace(/<[^>]+>/g, '').slice(0, 160)
    : `${caseStudy.title} · ${caseStudy.company}`;

  return {
    title: `${caseStudy.title} · ${caseStudy.company} · Brad Shaffer`,
    description,
    openGraph: {
      title: `${caseStudy.title} · ${caseStudy.company}`,
      description,
      url: `https://bshaffer.co/case-studies/${slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseStudy.title} · ${caseStudy.company}`,
      description,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getCaseStudyBySlug(slug);

  if (!result) {
    notFound();
  }

  const { caseStudy, bodyHtml } = result;
  const siteContent = await getSiteContent();
  const caseStudyMenuItems = await getCaseStudyMenuItems();

  // Determine the next published case study for footer navigation.
  const allCaseStudies = await getCaseStudies();
  const publishedOrdered = allCaseStudies
    .filter((cs) => cs.status === 'published')
    .sort((a, b) => a.order - b.order);
  const currentIndex = publishedOrdered.findIndex((cs) => cs.slug === caseStudy.slug);
  const nextStudy =
    currentIndex >= 0 && currentIndex < publishedOrdered.length - 1
      ? publishedOrdered[currentIndex + 1]
      : null;

  // Page number in the editorial index, padded.
  const pageNum = caseStudy.order.toString().padStart(2, '0');

  return (
    <>
      <Header 
        siteContent={siteContent}
        caseStudyMenuItems={caseStudyMenuItems}
        route={{
          kind: 'case-study',
          currentSlug: caseStudy.slug,
          currentNumber: pageNum,
          currentCompany: caseStudy.company,
          currentTitle: caseStudy.title,
        }}
      />

      <main className="flex-1">
        {/* Editorial header */}
        <section className="border-b border-border-strong py-10 lg:py-16">
          <div className="max-w-[1100px] mx-auto px-5 lg:px-8">
            {/* Title + numeral grid */}
            <div className="grid grid-cols-[3rem_1fr] lg:grid-cols-[6rem_1fr] gap-5 lg:gap-10 items-start">
              {/* Numeral */}
              <div
                className="font-serif font-medium text-accent-500 leading-none tabular-nums text-5xl lg:text-7xl"
                style={{ letterSpacing: '-0.03em' }}
              >
                {pageNum}
              </div>

              {/* Title block */}
              <div>
                <div
                  className="text-text-muted uppercase font-semibold mb-3 text-xs"
                  style={{ letterSpacing: '0.1em' }}
                >
                  {caseStudy.company}
                </div>
                <h1
                  className="font-serif font-medium text-text text-3xl lg:text-5xl leading-tight"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {caseStudy.title}
                </h1>
              </div>
            </div>

            {/* Metrics row */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-10 lg:mt-14 pt-6 border-t border-border">
                {caseStudy.metrics.map((metric, idx) => (
                  <div key={idx}>
                    <div
                      className="text-text-muted uppercase font-semibold mb-2 text-xs"
                      style={{ letterSpacing: '0.1em' }}
                    >
                      {metric.label}
                    </div>
                    <div className="font-serif font-medium text-text leading-none text-3xl lg:text-5xl tabular-nums">
                      {metric.value}
                      {metric.unit && (
                        <span className="text-text-muted ml-1 text-base lg:text-xl">
                          {metric.unit}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Body */}
        <section className="py-14 lg:py-20">
          <div className="max-w-[1100px] mx-auto px-5 lg:px-8">
            <article
              className="case-study-prose"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </div>
        </section>

        {/* Footer navigation */}
        <section className="border-t border-border-strong py-10 lg:py-14">
          <div className="max-w-[1100px] mx-auto px-5 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-6">
              <Link
                href="/#case-studies"
                className="font-mono text-xs uppercase text-text-muted hover:text-text transition-colors no-underline"
                style={{ letterSpacing: '0.1em' }}
              >
                ← Back to case study index
              </Link>

              {nextStudy && (
                <Link
                  href={`/case-studies/${nextStudy.slug}`}
                  className="group block no-underline text-right max-w-md"
                >
                  <div
                    className="font-mono text-xs uppercase text-text-muted mb-2"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    Next case study →
                  </div>
                  <div
                    className="font-serif font-medium text-text text-xl lg:text-2xl leading-tight group-hover:text-accent-500 transition-colors"
                    style={{ letterSpacing: '-0.015em' }}
                  >
                    {nextStudy.title}
                  </div>
                  <div
                    className="text-text-muted uppercase font-semibold mt-2 text-xs"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    {nextStudy.company} · {nextStudy.period}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
