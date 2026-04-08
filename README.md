# Portfolio Website

Portfolio personnel en Next.js avec lecture de la table Supabase `experiences`.

## Scripts

- `npm run dev` : lance le site en local
- `npm run build` : verifie le build de production
- `npm run start` : demarre l'app en production

## Configuration

1. Les variables Supabase sont attendues dans `.env.local`.
2. Le bouton CV utilise `public/cv/paul-hurard-cv.pdf`.
3. Les experiences sont chargees depuis Supabase dans `app/page.tsx`.

## Structure

- `app/` : routes et styles globaux Next.js
- `utils/supabase/` : helpers client, serveur et middleware
- `public/cv/` : dossier du CV telechargeable
