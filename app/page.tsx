import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageToggle } from "./components/LanguageToggle";
import { FadeIn } from "./hooks/useIntersectionObserver";
import { ArrowRight, Download, Mail, BookOpen, Briefcase } from "lucide-react";
import { dictionaries, type Locale } from "./utils/i18n";

type ExperienceRow = {
  id?: string | number;
  type?: string | null;
  title?: string | null;
  title_fr?: string | null;
  role?: string | null;
  company?: string | null;
  company_fr?: string | null;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
  description_fr?: string | null;
  impact_fr?: string | null;
  [key: string]: unknown;
};

function formatPeriod(experience: ExperienceRow, locale: Locale) {
  const start = typeof experience.start_date === "string" ? experience.start_date : null;
  const end = typeof experience.end_date === "string" ? experience.end_date : null;

  if (!start && !end) {
    return null;
  }

  const todayStr = locale === "fr" ? "Aujourd'hui" : "Present";
  return [start, end ?? todayStr].filter(Boolean).join(" - ");
}

function getHeading(experience: ExperienceRow, locale: Locale) {
  if (locale === "fr" && experience.title_fr) return experience.title_fr;
  return experience.title || experience.role || "";
}

function getCompanyStr(experience: ExperienceRow, locale: Locale) {
  const company = locale === "fr" && experience.company_fr ? experience.company_fr : experience.company;
  return [company, experience.location].filter(Boolean).join(" • ");
}

function getDescription(experience: ExperienceRow, locale: Locale) {
  if (locale === "fr" && experience.description_fr) {
    if (experience.impact_fr) {
      return `${experience.description_fr}\n\nImpact : ${experience.impact_fr}`;
    }
    return experience.description_fr;
  }
  return typeof experience.description === "string" ? experience.description : dictionaries[locale].experiences.syncSuccess;
}

function getKey(experience: ExperienceRow, index: number) {
  if (typeof experience.id === "string" || typeof experience.id === "number") {
    return String(experience.id);
  }
  return `exp-${index}`;
}

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const currentLocale = (cookieStore.get("NEXT_LOCALE")?.value as Locale) || "en";
  const dict = dictionaries[currentLocale];

  const { data: experiencesData, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });

  const educations = experiencesData?.filter(e => e.type === "eduction" || e.type === "education") || [];
  const experiences = experiencesData?.filter(e => e.type !== "eduction" && e.type !== "education") || [];

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
        ) : experiences && experiences.length > 0 ? (
          <div className="cards">
            {experiences.map((experience, index) => (
              <FadeIn key={getKey(experience as ExperienceRow, index)} delay={(index % 4) * 100} className="card">
                <div className="card-header">
                  <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{getHeading(experience as ExperienceRow, currentLocale) || dict.experiences.title}</h3>
                  <p className="card-subtitle">
                    {getCompanyStr(experience as ExperienceRow, currentLocale)}
                  </p>
                  {formatPeriod(experience as ExperienceRow, currentLocale) && (
                    <span className="card-period">{formatPeriod(experience as ExperienceRow, currentLocale)}</span>
                  )}
                </div>
                <div className="card-content">
                  <p style={{ whiteSpace: "pre-line" }}>{getDescription(experience as ExperienceRow, currentLocale)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn delay={200}>
            <div className="card">
              <h3>{dict.experiences.empty}</h3>
              <p>{dict.experiences.emptyDesc}</p>
            </div>
          </FadeIn>
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

        {error ? null : educations && educations.length > 0 ? (
          <div className="cards">
            {educations.map((experience, index) => (
              <FadeIn key={getKey(experience as ExperienceRow, index)} delay={(index % 4) * 100} className="card">
                <div className="card-header">
                  <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{getHeading(experience as ExperienceRow, currentLocale) || dict.education.title}</h3>
                  <p className="card-subtitle">
                    {getCompanyStr(experience as ExperienceRow, currentLocale)}
                  </p>
                  {formatPeriod(experience as ExperienceRow, currentLocale) && (
                    <span className="card-period">{formatPeriod(experience as ExperienceRow, currentLocale)}</span>
                  )}
                </div>
                <div className="card-content">
                  <p style={{ whiteSpace: "pre-line" }}>{getDescription(experience as ExperienceRow, currentLocale)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn delay={200}>
            <div className="card">
              <h3>{dict.education.empty}</h3>
              <p>{dict.experiences.emptyDesc}</p>
            </div>
          </FadeIn>
        )}
      </section>

      <FadeIn delay={100}>
        <section className="panel" id="skills">
          <span className="section-label">{dict.skills.label}</span>
          <h2>{dict.skills.title}</h2>
          <div className="skill-list">
            <span>Next.js 15</span>
            <span>React 19</span>
            <span>TypeScript</span>
            <span>Supabase SSR</span>
            <span>UI/UX Design</span>
            <span>Tailwind CSS</span>
            <span>Framer Motion</span>
            <span>Performance (Vitals)</span>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={200}>
        <section className="panel contact" id="contact">
          <span className="section-label">{dict.contact.label}</span>
          <h2>{dict.contact.title}</h2>
          <p>{dict.contact.text}</p>
          <a className="button primary" href="mailto:hello@example.com">
            <Mail size={18} /> {dict.contact.button}
          </a>
        </section>
      </FadeIn>
    </main>
  );
}
