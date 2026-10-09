import { writeFileSync, mkdirSync, unlinkSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "src", "app");
const publicDir = join(root, "public");
const publicIcons = join(publicDir, "icons");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <defs>
    <linearGradient id="g" x1="6" y1="5" x2="26" y2="27" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7eeaf6"/>
      <stop offset="0.48" stop-color="#2ec4d6"/>
      <stop offset="1" stop-color="#e2b86a"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="8" fill="#102632"/>
  <circle cx="16" cy="16" r="10" fill="url(#g)"/>
  <circle cx="12.5" cy="12.2" r="3" fill="#ffffff" fill-opacity="0.88"/>
</svg>`;

async function png(size) {
  return sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
}

mkdirSync(publicIcons, { recursive: true });

const [png16, png32, png48, png120, png180, png192, png512] = await Promise.all([
  png(16),
  png(32),
  png(48),
  png(120),
  png(180),
  png(192),
  png(512),
]);

// Clean public paths for search engines (no Next.js cache-bust query hashes).
writeFileSync(join(publicDir, "favicon.svg"), svg);
writeFileSync(join(publicDir, "favicon-120.png"), png120);
writeFileSync(join(publicDir, "apple-touch-icon.png"), png180);
writeFileSync(join(publicIcons, "icon-192.png"), png192);
writeFileSync(join(publicIcons, "icon-512.png"), png512);

const ico = await pngToIco([png16, png32, png48]);
writeFileSync(join(publicDir, "favicon.ico"), ico);

// Remove App Router file-based icons so Next does not inject hashed ?favicon.* links.
for (const name of ["favicon.ico", "icon.svg", "apple-icon.png"]) {
  const path = join(appDir, name);
  if (existsSync(path)) unlinkSync(path);
}

console.log(
  "Generated public/favicon.ico, favicon.svg, favicon-120.png, apple-touch-icon.png, icons/*",
);
