import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageToggle } from "./components/LanguageToggle";
import { SkillsMarquee } from "./components/SkillsMarquee";
import { ExperienceGrid, type ExperienceRow } from "./components/ExperienceGrid";
import { FadeIn } from "./hooks/useIntersectionObserver";
import { ArrowRight, Download, Mail, BookOpen, Briefcase } from "lucide-react";
import { dictionaries, type Locale } from "./utils/i18n";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const currentLocale = (cookieStore.get("NEXT_LOCALE")?.value as Locale) || "en";
  const dict = dictionaries[currentLocale];

  const { data: experiencesData, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });

  const educations = (experiencesData?.filter(e => e.type === "eduction" || e.type === "education") || []) as ExperienceRow[];
  const experiences = (experiencesData?.filter(e => e.type !== "eduction" && e.type !== "education") || []) as ExperienceRow[];

  const allSkills = new Set<string>();
  if (experiencesData) {
    for (const exp of experiencesData) {
      if (Array.isArray(exp.skills)) {
        for (const skill of exp.skills) {
          if (typeof skill === 'string' && skill.trim()) {
            allSkills.add(skill.trim());
          }
        }
      }
    }
  }
  const uniqueSkills = Array.from(allSkills);

  return (
    <main className="page-shell">
      <div className="background-glow" />

      <header className="site-header">
        <nav className="topbar">
          <span className="brand">Paul Huard.</span>
          <div className="nav-right">
            <div className="nav-links">
              <a href="#experiences">{dict.nav.experiences}</a>
              <a href="#education">{dict.nav.education}</a>
              <a href="#skills">{dict.nav.skills}</a>
              <a href="#contact">{dict.nav.contact}</a>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <LanguageToggle currentLocale={currentLocale} />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <FadeIn>
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="eyebrow">{dict.hero.eyebrow}</span>
              <h1>{dict.hero.title}</h1>
              <p className="intro">{dict.hero.intro}</p>
              <div className="hero-actions">
                <a className="button primary" href="#experiences">
                  {dict.hero.explore} <ArrowRight size={18} />
                </a>
                <a className="button secondary" href="/cv/paul-huard-cv.pdf" download>
                  <Download size={18} /> {dict.hero.download}
                </a>
              </div>
            </div>
            <div className="hero-image-container">
              <img src="/profile.jpg" alt="Paul Huard" className="hero-image" />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Professional Experiences Section */}
      <section id="experiences" className="panel" style={{ background: "transparent", border: "none", boxShadow: "none", padding: "40px 0" }}>
        <FadeIn delay={100}>
          <div className="section-heading">
            <div>
              <span className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Briefcase size={14} /> {dict.experiences.label}
              </span>
              <h2>{dict.experiences.title}</h2>
              <p>{dict.experiences.subtitle}</p>
            </div>
          </div>
        </FadeIn>

        {error ? (
          <FadeIn delay={200}>
            <div className="card">
              <h3>{dict.experiences.error}</h3>
              <p>{error.message}</p>
            </div>
          </FadeIn>
        ) : (
          <ExperienceGrid 
            items={experiences} 
            locale={currentLocale} 
            fallbackTitle={dict.experiences.title}
            dictEmpty={dict.experiences.empty}
            dictEmptyDesc={dict.experiences.emptyDesc}
          />
        )}
      </section>

      {/* Education Section */}
      <section id="education" className="panel" style={{ background: "transparent", border: "none", boxShadow: "none", padding: "40px 0" }}>
        <FadeIn delay={100}>
          <div className="section-heading">
            <div>
              <span className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={14} /> {dict.education.label}
              </span>
              <h2>{dict.education.title}</h2>
              <p>{dict.education.subtitle}</p>
            </div>
          </div>
        </FadeIn>

        {error ? (
           <FadeIn delay={200}>
              <div className="card">
                <h3>{dict.experiences.error}</h3>
                <p>{error.message}</p>
              </div>
           </FadeIn>
        ) : (
          <ExperienceGrid 
            items={educations} 
            locale={currentLocale} 
            fallbackTitle={dict.education.title}
            dictEmpty={dict.education.empty}
            dictEmptyDesc={dict.experiences.emptyDesc}
          />
        )}
      </section>

      <FadeIn delay={100}>
        <section className="panel" id="skills">
          <span className="section-label">{dict.skills.label}</span>
          <h2>{dict.skills.title}</h2>
          <SkillsMarquee skills={uniqueSkills} />
        </section>
      </FadeIn>

      <FadeIn delay={200}>
        <section className="panel contact" id="contact">
          <span className="section-label">{dict.contact.label}</span>
          <h2>{dict.contact.title}</h2>
          <p>{dict.contact.text}</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '32px' }}>
            <a className="button primary" href="mailto:paul.hrd45@gmail.com">
              <Mail size={18} /> {dict.contact.button}
            </a>
            <a className="button secondary" href="https://www.linkedin.com/in/paulhrd/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              {dict.contact.linkedin}
            </a>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
