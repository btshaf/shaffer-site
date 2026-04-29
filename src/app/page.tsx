import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditorialHero from "@/components/EditorialHero";
import DomainStrip from "@/components/DomainStrip";
import CaseStudyTOC from "@/components/CaseStudyTOC";
import ExperienceLedger from "@/components/ExperienceLedger";
import AboutPrinciples from "@/components/AboutPrinciples";
import ContactBackPage from "@/components/ContactBackPage";
import { getSiteContent, getExperience, getCaseStudies, getCaseStudyMenuItems } from "@/lib/content";

export default async function Home() {
  const [siteContent, experiences, caseStudies, caseStudyMenuItems] = await Promise.all([
    getSiteContent(),
    getExperience(),
    getCaseStudies(),
    getCaseStudyMenuItems()
  ]);
  
  return (
    <>
      <div id="top"></div>
      <Header 
        siteContent={siteContent} 
        caseStudyMenuItems={caseStudyMenuItems}
        route={{ kind: 'home' }}
      />
      
      <main className="flex-1">
        <EditorialHero siteContent={siteContent} />
        
        <DomainStrip siteContent={siteContent} />
        
        <CaseStudyTOC caseStudies={caseStudies} siteContent={siteContent} />
        
        <ExperienceLedger experience={experiences} siteContent={siteContent} />
        
        <AboutPrinciples siteContent={siteContent} />
      </main>
      
      <ContactBackPage siteContent={siteContent} />
      
      <Footer />
    </>
  );
}
