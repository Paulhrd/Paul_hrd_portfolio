"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FadeIn } from "../hooks/useIntersectionObserver";
import { type Locale } from "../utils/i18n";
import { X, Calendar, MapPin, Building2 } from "lucide-react";
import { dictionaries } from "../utils/i18n";

export type ExperienceRow = {
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
  skills?: string[] | null;
  technologies?: string[] | null;
  [key: string]: unknown;
};

// Helpers
export function formatPeriod(experience: ExperienceRow, locale: Locale) {
  const start = typeof experience.start_date === "string" ? experience.start_date : null;
  const end = typeof experience.end_date === "string" ? experience.end_date : null;

  if (!start && !end) return null;

  const todayStr = locale === "fr" ? "Aujourd'hui" : "Present";
  return [start, end ?? todayStr].filter(Boolean).join(" - ");
}

export function getHeading(experience: ExperienceRow, locale: Locale) {
  if (locale === "fr" && experience.title_fr) return experience.title_fr;
  return experience.title || experience.role || "";
}

export function getCompanyStr(experience: ExperienceRow, locale: Locale, withLocation = true) {
  const company = locale === "fr" && experience.company_fr ? experience.company_fr : experience.company;
  if (withLocation) {
    return [company, experience.location].filter(Boolean).join(" • ");
  }
  return company || "";
}

export function getDescription(experience: ExperienceRow, locale: Locale, forModal = false) {
  if (locale === "fr" && experience.description_fr) {
    if (forModal && experience.impact_fr) {
      return `${experience.description_fr}\n\n**Impact :**\n${experience.impact_fr}`;
    }
    return experience.description_fr;
  }
  return typeof experience.description === "string" ? experience.description : dictionaries[locale].experiences.syncSuccess;
}

export function getKey(experience: ExperienceRow, index: number) {
  if (typeof experience.id === "string" || typeof experience.id === "number") {
    return String(experience.id);
  }
  return `exp-${index}`;
}

export function ExperienceGrid({
  items,
  locale,
  fallbackTitle,
  dictEmpty,
  dictEmptyDesc,
}: {
  items: ExperienceRow[];
  locale: Locale;
  fallbackTitle: string;
  dictEmpty: string;
  dictEmptyDesc: string;
}) {
  const [selectedOpt, setSelectedOpt] = useState<ExperienceRow | null>(null);

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedOpt(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedOpt) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedOpt]);

  if (items.length === 0) {
    return (
      <FadeIn delay={200}>
        <div className="card">
          <h3>{dictEmpty}</h3>
          <p>{dictEmptyDesc}</p>
        </div>
      </FadeIn>
    );
  }

  return (
    <>
      <div className="cards">
        {items.map((exp, index) => (
          <FadeIn key={getKey(exp, index)} delay={(index % 4) * 100} className="card clickable-card">
            <div 
              style={{ cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
              onClick={() => setSelectedOpt(exp)}
            >
              <div className="card-header">
                <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{getHeading(exp, locale) || fallbackTitle}</h3>
                <p className="card-subtitle">{getCompanyStr(exp, locale)}</p>
                {formatPeriod(exp, locale) && (
                  <span className="card-period">{formatPeriod(exp, locale)}</span>
                )}
              </div>
              <div className="card-content">
                <p className="line-clamp-3" style={{ whiteSpace: "pre-line" }}>
                  {getDescription(exp, locale, false)}
                </p>
                <span className="read-more">En savoir plus →</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {selectedOpt && typeof document !== "undefined" && createPortal(
        <div className="modal-overlay" onClick={() => setSelectedOpt(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedOpt(null)}>
              <X size={24} />
            </button>
            <div className="modal-header">
              <h2>{getHeading(selectedOpt, locale) || fallbackTitle}</h2>
              <div className="modal-meta-tags">
                {getCompanyStr(selectedOpt, locale, false) && (
                   <span className="meta-tag"><Building2 size={16} />{getCompanyStr(selectedOpt, locale, false)}</span>
                )}
                {selectedOpt.location && (
                   <span className="meta-tag"><MapPin size={16} />{selectedOpt.location as string}</span>
                )}
                {formatPeriod(selectedOpt, locale) && (
                   <span className="meta-tag"><Calendar size={16} />{formatPeriod(selectedOpt, locale)}</span>
                )}
              </div>
            </div>
            
            <div className="modal-body">
              <div className="modal-section">
                <h3>Description</h3>
                <p style={{ whiteSpace: "pre-line" }}>
                  {getDescription(selectedOpt, locale, false)}
                </p>
              </div>

              {(locale === "fr" && selectedOpt.impact_fr) && (
                <div className="modal-section">
                  <h3>Impact</h3>
                  <p style={{ whiteSpace: "pre-line" }}>{selectedOpt.impact_fr as string}</p>
                </div>
              )}

              {Array.isArray(selectedOpt.skills) && selectedOpt.skills.length > 0 && (
                <div className="modal-section">
                  <h3>{locale === "fr" ? "Compétences" : "Skills"}</h3>
                  <div className="modal-badge-list">
                    {selectedOpt.skills.map((skill) => (
                      <span className="modal-badge" key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(selectedOpt.technologies) && selectedOpt.technologies.length > 0 && (
                <div className="modal-section">
                  <h3>Technologies</h3>
                  <div className="modal-badge-list tech-list">
                    {selectedOpt.technologies.map((tech) => (
                      <span className="modal-badge tech-badge" key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
