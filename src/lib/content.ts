import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

// Content directory paths
const contentDirectory = path.join(process.cwd(), 'content');
const experienceDirectory = path.join(contentDirectory, 'experience');
const caseStudiesDirectory = path.join(contentDirectory, 'case-studies');

// TypeScript interfaces for content schemas
export interface SiteContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroBio: string;
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
  summary: string; // Parsed markdown body
}

// Utility function to process markdown content
async function processMarkdown(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkHtml)
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

// Get all case studies
export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!fs.existsSync(caseStudiesDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(caseStudiesDirectory);
  const caseStudies = await Promise.all(
    fileNames
      .filter(name => name.endsWith('.md'))
      .map(async (name) => {
        const filePath = path.join(caseStudiesDirectory, name);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const summary = await processMarkdown(content);
        
        return {
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