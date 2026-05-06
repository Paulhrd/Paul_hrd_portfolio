import type { ReactNode } from "react";

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

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export function MarkdownDocument({ markdown }: { markdown: string }) {
  const blocks = parseMarkdown(markdown);

  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "h1") {
          return <h1 key={index}>{renderInline(block.content)}</h1>;
        }

        if (block.type === "h2") {
          return <h2 key={index}>{renderInline(block.content)}</h2>;
        }

        if (block.type === "h3") {
          return <h3 key={index}>{renderInline(block.content)}</h3>;
        }

        if (block.type === "quote") {
          return <blockquote key={index}>{renderInline(block.content)}</blockquote>;
        }

        return <p key={index}>{renderInline(block.content)}</p>;
      })}
    </>
  );
}
