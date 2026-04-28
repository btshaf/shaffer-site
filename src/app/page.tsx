import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditorialHero from "@/components/EditorialHero";
import DomainStrip from "@/components/DomainStrip";
import CaseStudyTOC from "@/components/CaseStudyTOC";
import ExperienceLedger from "@/components/ExperienceLedger";
import AboutPrinciples from "@/components/AboutPrinciples";
import ContactBackPage from "@/components/ContactBackPage";
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
        <EditorialHero siteContent={siteContent} />
        
        <DomainStrip siteContent={siteContent} />
        
        <CaseStudyTOC caseStudies={caseStudies} />
        
        <ExperienceLedger experience={experiences} />
        
        <AboutPrinciples siteContent={siteContent} />
      </main>
      
      <ContactBackPage siteContent={siteContent} />
      
      <Footer />
    </>
  );
}
