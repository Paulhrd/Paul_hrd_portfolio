import { readFile } from "fs/promises";
import path from "path";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { CybercoreBackground } from "../components/ui/CybercoreBackground";

export const metadata: Metadata = {
  title: "Politique de confidentialite de Barava | Paul Huard",
  description: "Politique de confidentialite de l'application Barava.",
};

type MarkdownBlock =
  | { type: "h1" | "h2" | "h3" | "p" | "quote"; content: string }
  | { type: "ul"; items: string[] };

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = markdown.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line) {
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [line.slice(2)];

      while (index + 1 < lines.length && lines[index + 1].trim().startsWith("- ")) {
        index += 1;
        items.push(lines[index].trim().slice(2));
      }

      blocks.push({ type: "ul", items });
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", content: line.slice(4) });
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", content: line.slice(3) });
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push({ type: "h1", content: line.slice(2) });
      continue;
    }

    if (line.startsWith("> ")) {
      blocks.push({ type: "quote", content: line.slice(2) });
      continue;
    }

    blocks.push({ type: "p", content: line });
  }

  return blocks;
}

export default async function PolitiqueConfidentialitePage() {
  const filePath = path.join(process.cwd(), "POLITIQUE_DE_CONFIDENTIALITE.md");
  const markdown = await readFile(filePath, "utf8");
  const blocks = parseMarkdown(markdown);

  return (
    <main className="page-shell legal-page">
      <CybercoreBackground />

      <header className="legal-header">
        <a className="button secondary" href="/">
          <ArrowLeft size={18} /> Retour au portfolio
        </a>
      </header>

      <article className="panel legal-document">
        {blocks.map((block, index) => {
          if (block.type === "ul") {
            return (
              <ul key={index}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );
          }

          if (block.type === "h1") {
            return <h1 key={index}>{block.content}</h1>;
          }

          if (block.type === "h2") {
            return <h2 key={index}>{block.content}</h2>;
          }

          if (block.type === "h3") {
            return <h3 key={index}>{block.content}</h3>;
          }

          if (block.type === "quote") {
            return <blockquote key={index}>{block.content}</blockquote>;
          }

          return <p key={index}>{block.content}</p>;
        })}
      </article>
    </main>
  );
}
