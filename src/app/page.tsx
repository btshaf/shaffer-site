import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ExperienceList from "@/components/ExperienceList";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import About from "@/components/About";
import ContactSection from "@/components/ContactSection";
import { getSiteContent, getExperience, getCaseStudies } from "@/lib/content";

export default async function Home() {
  const [siteContent, experiences, caseStudies] = await Promise.all([
    getSiteContent(),
    getExperience(),
    getCaseStudies()
  ]);
  
  return (
    <>
      <div id="top"></div>
      <Header />
      
      <main className="flex-1">
        <Hero 
          eyebrow={siteContent.heroEyebrow}
          headline={siteContent.heroHeadline}
          bio={siteContent.heroBio}
          resumeUrl={siteContent.resumeUrl}
          email={siteContent.email}
        />
        
        <ExperienceList experiences={experiences} />
        
        <CaseStudyGrid caseStudies={caseStudies} />
        
        <About content={siteContent.aboutContent} />
      </main>
      
      <ContactSection />
      
      <Footer />
    </>
  );
}
