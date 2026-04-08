export const dictionaries = {
  en: {
    hero: {
      eyebrow: "Personal Portfolio",
      title: "I turn data into intelligent products: interfaces, automations, and AI models.",
      intro: "This version loads your experiences in real-time from Supabase into a blazing fast interface powered by Next.js.",
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
      subtitle: "Timeline of my professional journey loaded from the database.",
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
      text: "I am always open to new opportunities or simply to chat about web technologies and product design.",
      button: "Contact me",
    },
  },
  fr: {
    hero: {
      eyebrow: "Portfolio Personnel",
      title: "Je transforme la data en produits intelligents : interfaces, automatisations et modèles d'IA.",
      intro: "Cette version charge vos experiences en temps reel depuis Supabase dans une interface ultra-rapide propulsee par Next.js.",
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
      subtitle: "Chronologie de mon parcours professionnel charge depuis la base de donnees.",
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
      text: "Je suis toujours ouvert a de nouvelles opportunites ou simplement pour echanger autour des technologies web et du design produit.",
      button: "Me contacter",
    },
  },
};

export type Locale = keyof typeof dictionaries;
