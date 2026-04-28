import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

// Content directory paths
const contentDirectory = path.join(process.cwd(), 'content');
const experienceDirectory = path.join(contentDirectory, 'experience');
const caseStudiesDirectory = path.join(contentDirectory, 'case-studies');
const caseStudyBodiesDirectory = path.join(caseStudiesDirectory, 'full');

// Derive a URL slug from a TOC filename like "01-gierd-ledger.md" -> "gierd-ledger"
function slugFromFilename(name: string): string {
  return name.replace(/^\d+-/, '').replace(/\.md$/, '');
}

// TypeScript interfaces for content schemas
export interface SiteContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroBio: string;
  heroIssueLine: {
    left: string[];
    right: string[];
  };
  heroDisplayHeadline: string;
  heroColophonByline: string;
  heroColophonRole: string;
  domains: string[];
  contactEyebrow: string;
  contactHeadline: string;
  contactLede: string;
  contactHelper: string;
  resumeUrl: string;
  email: string;
  linkedin: string;
  location: string;
  aboutContent: string; // Parsed markdown body
}

export interface ExperienceEntry {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  order: number;
  description: string; // Parsed markdown body
}

export interface CaseStudy {
  slug: string; // Derived from filename, used for /case-studies/[slug] route
  title: string;
  company: string;
  period: string;
  tag: string;
  status: 'published' | 'coming-soon';
  order: number;
  metrics?: Array<{
    label: string;
    value: number;
    unit: string;
  }>;
  summary: string; // Parsed markdown body of the TOC entry
}

export interface CaseStudyWithBody {
  caseStudy: CaseStudy;
  bodyHtml: string; // Full long-form case study, parsed from content/case-studies/full/{slug}.md
}

// Utility function to process markdown content.
// `sanitize: false` allows raw HTML and SVG embedded in markdown bodies to pass
// through to the rendered output. Authoring is repo-controlled (Brad), so this
// is not exposed to user input — safe to disable sanitization.
async function processMarkdown(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(content);
  return processedContent.toString();
}

// Get site-level content
export async function getSiteContent(): Promise<SiteContent> {
  const filePath = path.join(contentDirectory, 'site.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const aboutContent = await processMarkdown(content);
  
  return {
    heroEyebrow: data.heroEyebrow,
    heroHeadline: data.heroHeadline,
    heroBio: data.heroBio,
    heroIssueLine: data.heroIssueLine,
    heroDisplayHeadline: data.heroDisplayHeadline,
    heroColophonByline: data.heroColophonByline,
    heroColophonRole: data.heroColophonRole,
    domains: data.domains,
    contactEyebrow: data.contactEyebrow,
    contactHeadline: data.contactHeadline,
    contactLede: data.contactLede,
    contactHelper: data.contactHelper,
    resumeUrl: data.resumeUrl,
    email: data.email,
    linkedin: data.linkedin,
    location: data.location,
    aboutContent,
  };
}

// Get all experience entries
export async function getExperience(): Promise<ExperienceEntry[]> {
  if (!fs.existsSync(experienceDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(experienceDirectory);
  const experiences = await Promise.all(
    fileNames
      .filter(name => name.endsWith('.md'))
      .map(async (name) => {
        const filePath = path.join(experienceDirectory, name);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const description = await processMarkdown(content);
        
        return {
          company: data.company,
          role: data.role,
          start: data.start,
          end: data.end,
          location: data.location,
          order: data.order,
          description,
        } as ExperienceEntry;
      })
  );
  
  // Sort by order (ascending)
  return experiences.sort((a, b) => a.order - b.order);
}

// Get all case studies (TOC entries only — does not include full body content)
export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!fs.existsSync(caseStudiesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(caseStudiesDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name);

  const caseStudies = await Promise.all(
    fileNames.map(async (name) => {
      const filePath = path.join(caseStudiesDirectory, name);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      const summary = await processMarkdown(content);

      return {
        slug: slugFromFilename(name),
        title: data.title,
        company: data.company,
        period: data.period,
        tag: data.tag,
        status: data.status,
        order: data.order,
        metrics: data.metrics,
        summary,
      } as CaseStudy;
    })
  );

  // Sort by order (ascending)
  return caseStudies.sort((a, b) => a.order - b.order);
}

// Get a single case study with its full long-form body content.
// Returns null if the slug is unknown, the case study is not published,
// or there is no body file at content/case-studies/full/{slug}.md.
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyWithBody | null> {
  const all = await getCaseStudies();
  const caseStudy = all.find((cs) => cs.slug === slug);

  if (!caseStudy || caseStudy.status !== 'published') {
    return null;
  }

  const bodyPath = path.join(caseStudyBodiesDirectory, `${slug}.md`);
  if (!fs.existsSync(bodyPath)) {
    return null;
  }

  const bodyRaw = fs.readFileSync(bodyPath, 'utf8');
  // Body files may have no frontmatter, but support it if present.
  const { content } = matter(bodyRaw);
  const bodyHtml = await processMarkdown(content);

  return { caseStudy, bodyHtml };
}

// Get all published slugs. Used by the [slug] route to statically generate pages.
export async function getPublishedCaseStudySlugs(): Promise<string[]> {
  const all = await getCaseStudies();
  return all
    .filter((cs) => cs.status === 'published')
    .map((cs) => cs.slug);
}