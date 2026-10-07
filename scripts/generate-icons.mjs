import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "src", "app");
const publicIcons = join(root, "public", "icons");

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

const [png16, png32, png48, png180, png192, png512] = await Promise.all([
  png(16),
  png(32),
  png(48),
  png(180),
  png(192),
  png(512),
]);

writeFileSync(join(appDir, "icon.svg"), svg);
writeFileSync(join(appDir, "apple-icon.png"), png180);
writeFileSync(join(publicIcons, "icon-192.png"), png192);
writeFileSync(join(publicIcons, "icon-512.png"), png512);

const ico = await pngToIco([png16, png32, png48]);
writeFileSync(join(appDir, "favicon.ico"), ico);

console.log("Generated favicon.ico, icon.svg, apple-icon.png, public/icons/*");
