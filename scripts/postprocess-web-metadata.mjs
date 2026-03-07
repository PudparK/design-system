import fs from "node:fs";
import path from "node:path";

const outputPath = path.resolve("dist/index.html");
const bundledOgImagePath = path.resolve("assets/images/og-image.png");
const publicOgImagePath = path.resolve("dist/og-image.png");

if (!fs.existsSync(outputPath)) {
  throw new Error(`Expected web export at ${outputPath}, but the file does not exist.`);
}

const title = process.env.SITE_TITLE || "CoolNameHere Design System";
const description =
  process.env.SITE_DESCRIPTION ||
  "Standalone React Native Storybook for the CoolNameHere design system, including foundations, components, and mobile UI patterns.";
const siteUrl = stripTrailingSlash(process.env.SITE_URL || "");

if (fs.existsSync(bundledOgImagePath)) {
  fs.copyFileSync(bundledOgImagePath, publicOgImagePath);
}

const ogImageUrl =
  process.env.OG_IMAGE_URL || (siteUrl && fs.existsSync(publicOgImagePath) ? `${siteUrl}/og-image.png` : "");

const metaTags = [
  `<meta name="description" content="${escapeHtml(description)}" />`,
  `<meta property="og:type" content="website" />`,
  `<meta property="og:title" content="${escapeHtml(title)}" />`,
  `<meta property="og:description" content="${escapeHtml(description)}" />`,
  `<meta name="twitter:card" content="${ogImageUrl ? "summary_large_image" : "summary"}" />`,
  `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
];

if (siteUrl) {
  metaTags.push(
    `<link rel="canonical" href="${escapeHtml(siteUrl)}" />`,
    `<meta property="og:url" content="${escapeHtml(siteUrl)}" />`,
  );
}

if (ogImageUrl) {
  metaTags.push(
    `<meta property="og:image" content="${escapeHtml(ogImageUrl)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />`,
  );
}

let html = fs.readFileSync(outputPath, "utf8");

html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
html = html.replace("</head>", `  ${metaTags.join("\n  ")}\n  </head>`);

fs.writeFileSync(outputPath, html);

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function stripTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}
