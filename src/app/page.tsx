import { readData } from '@/lib/db';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Timeline from '@/sections/Timeline';
import Contact from '@/sections/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  const data = readData();

  return (
    <>
      {/* Navbar only rendered on landing portfolio route */}
      <Header />
      
      <main className="flex-1">
        {/* Hero Area */}
        <Hero profile={data.profile} />
        
        {/* Detailed Profile Introduction & Badges */}
        <About profile={data.profile} achievements={data.achievements} />
        
        {/* Grid of expertise items */}
        <Skills skills={data.skills} />
        
        {/* Dynamic portfolio projects manager showcase */}
        <Projects projects={data.projects} />
        
        {/* Timeline roadmap milestones */}
        <Timeline experience={data.experience} />
        
        {/* Contact Form Submission */}
        <Contact email={data.profile.email} phone={data.profile.phone} />
      </main>

      {/* Global Landing Footer */}
      <Footer
        name={data.profile.name}
        github={data.profile.github}
        linkedin={data.profile.linkedin}
        email={data.profile.email}
      />
    </>
  );
}
