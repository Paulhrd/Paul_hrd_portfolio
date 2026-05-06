import { readFile } from "fs/promises";
import path from "path";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { MarkdownDocument } from "../components/MarkdownDocument";
import { CybercoreBackground } from "../components/ui/CybercoreBackground";

export const metadata: Metadata = {
  title: "Securite enfant - Barava | Paul Huard",
  description: "Normes de securite enfant de l'application Barava.",
};

export default async function SecuriteEnfantPage() {
  const filePath = path.join(process.cwd(), "NORMES_SECURITE_ENFANTS.md");
  const markdown = await readFile(filePath, "utf8");

  return (
    <main className="page-shell legal-page">
      <CybercoreBackground />

      <header className="legal-header">
        <a className="button secondary" href="/">
          <ArrowLeft size={18} /> Retour au portfolio
        </a>
      </header>

      <article className="panel legal-document">
        <MarkdownDocument markdown={markdown} />
      </article>
    </main>
  );
}
