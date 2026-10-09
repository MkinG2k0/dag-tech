import { createWriteStream } from "node:fs";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "projects");
const tmpDir = path.join(root, ".tmp-rustore");

const apps = [
  {
    id: "ai-food",
    package: "com.aifood.app",
    prefix: "ai-food",
    alts: [
      "Промо AI Food в RuStore",
      "Дневник питания AI Food",
      "Разбор блюда по фото",
      "Экран калорий и БЖУ",
      "Скриншот AI Food",
      "Ещё экран AI Food",
      "Дополнительный экран AI Food",
      "Интерфейс AI Food",
    ],
  },
  {
    id: "ai-fit",
    package: "com.aifit.fit",
    prefix: "ai-fit",
    alts: [
      "Промо приложения Подход",
      "Список тренировок",
      "Ввод подходов и веса",
      "График прогресса",
      "Скриншот Подход",
      "Ещё экран Подход",
      "Дополнительный экран Подход",
      "Интерфейс Подход",
    ],
  },
  {
    id: "voiceride",
    package: "ru.mk.voiceride",
    prefix: "voiceride",
    alts: [
      "Промо VoiceRide Camera",
      "Голосовое управление камерой",
      "Экран записи на шлеме",
      "Команды старт и фото",
      "Скриншот VoiceRide Camera",
      "Ещё экран VoiceRide Camera",
      "Дополнительный экран VoiceRide",
      "Интерфейс VoiceRide Camera",
    ],
  },
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function extractDirectScreenshots(html) {
  const re =
    /https:\/\/static\.rustore\.ru\/(?:\d{4}\/\d{1,2}\/\d{1,2}\/[0-9a-f]+\/)?apk\/\d+\/content\/SCREENSHOT\/[0-9a-f-]+\.(?:png|jpe?g|webp)/gi;
  return [...new Set([...html.matchAll(re)].map((m) => m[0]))];
}

function apkIdFromUrl(url) {
  const m = url.match(/\/apk\/(\d+)\//);
  return m?.[1] ?? null;
}

function pickAppScreenshots(urls) {
  // First direct SCREENSHOT URL on the page belongs to the app itself.
  const firstApk = apkIdFromUrl(urls[0] ?? "");
  if (!firstApk) return [];
  return urls.filter((url) => apkIdFromUrl(url) === firstApk);
}

async function fetchHtml(pkg) {
  const url = `https://www.rustore.ru/catalog/app/${pkg}`;
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html" },
  });
  if (!res.ok) throw new Error(`${pkg}: HTTP ${res.status}`);
  return res.text();
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok || !res.body) throw new Error(`download ${url}: ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
}

function toWebp(src, dest) {
  const result = spawnSync(
    "ffmpeg",
    ["-y", "-i", src, "-c:v", "libwebp", "-quality", "90", "-compression_level", "4", dest],
    { encoding: "utf8" },
  );
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${src}: ${result.stderr || result.stdout}`);
  }
}

async function main() {
  await mkdir(tmpDir, { recursive: true });
  await mkdir(outDir, { recursive: true });

  const shotMap = {};

  for (const app of apps) {
    console.log(`\n== ${app.id}`);
    const html = await fetchHtml(app.package);
    const all = extractDirectScreenshots(html);
    const shots = pickAppScreenshots(all);
    console.log(`  apk shots: ${shots.length}`);
    shots.forEach((u, i) => console.log(`   ${i + 1}. ${u}`));

    const saved = [];
    for (let i = 0; i < shots.length; i++) {
      const url = shots[i];
      const ext = path.extname(new URL(url).pathname) || ".png";
      const rawPath = path.join(tmpDir, `${app.prefix}-${i + 1}${ext}`);
      const webpName = `${app.prefix}-${i + 1}.webp`;
      const webpPath = path.join(outDir, webpName);

      await download(url, rawPath);
      toWebp(rawPath, webpPath);
      try {
        await unlink(rawPath);
      } catch {
        /* ignore */
      }

      saved.push({
        src: `/projects/${webpName}`,
        alt: app.alts[i] ?? `Скриншот ${app.id} ${i + 1}`,
        kind: "phone",
      });
      console.log(`  saved ${webpName}`);
    }

    // Keep cover as first shot-ish if cover file exists separately; cover stays untouched.
    shotMap[app.id] = saved;
  }

  await writeFile(path.join(tmpDir, "shots.json"), JSON.stringify(shotMap, null, 2));
  console.log("\nDone. Wrote", path.join(tmpDir, "shots.json"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
