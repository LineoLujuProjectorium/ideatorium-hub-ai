export function renderHTML(files: Record<string, string>) {
  const page =
    files["app/page.tsx"] ??
    `<main><h1>No page.tsx found</h1></main>`;

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Generated App</title>
  </head>
  <body>
    <div id="root">
      ${stripReact(page)}
    </div>
  </body>
</html>
`;
}

function stripReact(source: string) {
  return source
    .replace(/export default function.*?\{/, "")
    .replace(/return\s*\(/, "")
    .replace(/\);\s*\}/, "")
    .replace(/<\/?React\.Fragment>/g, "");
}
