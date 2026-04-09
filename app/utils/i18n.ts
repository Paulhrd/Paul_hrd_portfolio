export const dictionaries = {
  en: {
    hero: {
      eyebrow: "Personal Portfolio",
      titleStart: "I turn data into intelligent products:",
      titleWords: ["interfaces", "automations", "AI models"],
      intro: "Full-stack & data science engineer, I build data-driven applications and solutions. Open to opportunities worldwide.",
      explore: "Explore my experiences",
      download: "Download my Resume",
    },
    nav: {
      experiences: "Experiences",
      education: "Education",
      skills: "Skills",
      contact: "Contact",
    },
    experiences: {
      label: "Journey",
      title: "My Experiences",
      subtitle: "Timeline of my professional journey.",
      empty: "No professional experiences yet",
      emptyDesc: "Add rows in the `experiences` table to see them here.",
      error: "Unable to load experiences",
      syncSuccess: "Experience successfully synchronized from Supabase.",
    },
    education: {
      label: "Studies",
      title: "Education",
      subtitle: "My academic background and degrees.",
      empty: "No education records yet",
    },
    skills: {
      label: "Expertise",
      title: "My Skills",
    },
    contact: {
      label: "Discussion",
      title: "Want to collaborate?",
      text: "I’m open to new challenges around data, AI, and building high-impact systems.",
      button: "Contact me",
      linkedin: "Connect on LinkedIn",
    },
    footer: {
      copyright: "© 2026 Paul Huard. All rights reserved.",
      builtWith: "Built with Next.js & Supabase.",
    },
  },
  fr: {
    hero: {
      eyebrow: "Portfolio Personnel",
      titleStart: "Je transforme la data en produits intelligents :",
      titleWords: ["interfaces", "automatisations", "modèles d'IA"],
      intro: "Ingénieur full-stack & data science, je développe des applications et solutions data-driven. Ouvert à des opportunités partout dans le monde.",
      explore: "Explorer mes experiences",
      download: "Telecharger mon CV",
    },
    nav: {
      experiences: "Experiences",
      education: "Formations",
      skills: "Competences",
      contact: "Contact",
    },
    experiences: {
      label: "Parcours",
      title: "Experiences Professionnelles",
      subtitle: "Chronologie de mon parcours professionnel.",
      empty: "Aucune experience pour le moment",
      emptyDesc: "Ajoute des lignes dans la table `experiences` pour les voir apparaitre ici.",
      error: "Impossible de charger les experiences",
      syncSuccess: "Experience synchronisee avec succes depuis Supabase.",
    },
    education: {
      label: "Etudes",
      title: "Formations & Diplomes",
      subtitle: "Mon parcours academique et mes certifications.",
      empty: "Aucune formation pour le moment",
    },
    skills: {
      label: "Expertise",
      title: "Mes Competences",
    },
    contact: {
      label: "Discussion",
      title: "Envie de collaborer ?",
      text: "Je suis ouvert à de nouveaux défis autour de la data, de l’IA et de la construction de systèmes à fort impact.",
      button: "Me contacter",
      linkedin: "Discuter sur LinkedIn",
    },
    footer: {
      copyright: "© 2026 Paul Huard. Tous droits réservés.",
      builtWith: "Propulsé par Next.js & Supabase.",
    },
  },
};

export type Locale = keyof typeof dictionaries;
