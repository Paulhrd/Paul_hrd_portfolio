import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";

type ExperienceRow = {
  id?: string | number;
  title?: string | null;
  role?: string | null;
  company?: string | null;
  location?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
  [key: string]: unknown;
};

function formatPeriod(experience: ExperienceRow) {
  const start = typeof experience.start_date === "string" ? experience.start_date : null;
  const end = typeof experience.end_date === "string" ? experience.end_date : null;

  if (!start && !end) {
    return null;
  }

  return [start, end ?? "Aujourd'hui"].filter(Boolean).join(" - ");
}

function getHeading(experience: ExperienceRow) {
  return experience.title || experience.role || "Experience";
}

function getKey(experience: ExperienceRow, index: number) {
  if (typeof experience.id === "string" || typeof experience.id === "number") {
    return String(experience.id);
  }

  return `${getHeading(experience)}-${index}`;
}

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: experiences, error } = await supabase
    .from("experiences")
    .select("*")
    .order("start_date", { ascending: false });

  return (
    <main className="page-shell">
      <section className="hero">
        <nav className="topbar">
          <span className="brand">Paul Hurard</span>
          <div className="nav-links">
            <a href="#experiences">Experiences</a>
            <a href="#skills">Competences</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow">Portfolio personnel</p>
          <h1>Je construis des interfaces web claires, modernes et utiles.</h1>
          <p className="intro">
            Cette version Next.js charge maintenant tes experiences depuis Supabase,
            pour que ton portfolio reste facile a mettre a jour.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#experiences">
              Voir mes experiences
            </a>
            <a className="button secondary" href="/cv/paul-hurard-cv.pdf" download>
              Telecharger mon CV
            </a>
          </div>
        </div>
      </section>

      <section className="panel" id="experiences">
        <p className="section-label">Experiences</p>
        <div className="section-heading">
          <h2>Parcours professionnel</h2>
          <p>Les donnees ci-dessous viennent directement de ta table Supabase `experiences`.</p>
        </div>

        {error ? (
          <div className="empty-state">
            <h3>Impossible de charger les experiences</h3>
            <p>{error.message}</p>
          </div>
        ) : experiences && experiences.length > 0 ? (
          <div className="cards">
            {experiences.map((experience, index) => (
              <article className="card" key={getKey(experience as ExperienceRow, index)}>
                <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{getHeading(experience as ExperienceRow)}</h3>
                <p className="card-subtitle">
                  {[experience.company, experience.location].filter(Boolean).join(" • ")}
                </p>
                {formatPeriod(experience as ExperienceRow) ? (
                  <p className="card-period">{formatPeriod(experience as ExperienceRow)}</p>
                ) : null}
                {typeof experience.description === "string" && experience.description.trim() ? (
                  <p>{experience.description}</p>
                ) : (
                  <p>
                    Experience synchronisee depuis Supabase. Tu peux enrichir
                    l&apos;affichage selon les colonnes de ta table.
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Aucune experience pour le moment</h3>
            <p>Ajoute des lignes dans la table `experiences` pour les voir apparaitre ici.</p>
          </div>
        )}
      </section>

      <section className="panel skills" id="skills">
        <p className="section-label">Competences</p>
        <div className="skill-list">
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>Supabase</span>
          <span>UI Design</span>
          <span>Responsive</span>
          <span>Performance</span>
        </div>
      </section>

      <section className="panel contact" id="contact">
        <p className="section-label">Contact</p>
        <h2>Disponible pour echanger sur ton prochain projet</h2>
        <p>
          Remplace ce contenu par ton email, ton LinkedIn, ton GitHub et les
          informations utiles pour te contacter.
        </p>
        <a className="button primary" href="mailto:hello@example.com">
          Me contacter
        </a>
      </section>
    </main>
  );
}
