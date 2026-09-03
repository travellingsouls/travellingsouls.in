/**
 * Turns the supplied logo JPEG into web-ready assets.
 *
 * The original is gold artwork on a solid black square with wide padding.
 * Dropped straight onto the site's sand-coloured navbar it would render as a
 * black rectangle, so the black has to become transparent first.
 *
 * Because the artwork sits on pure black, alpha can be derived from
 * brightness: black background -> transparent, gold and white artwork ->
 * opaque, antialiased edges -> partial. That is what makes the logo usable on
 * both the light header and the dark footer without two separate files.
 *
 * Run:  node scripts/process-logo.mjs
 * Only needed when the source logo changes; the outputs are committed.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SOURCE = "public/logo/travellingsouls-logo.jpeg";
const OUT_DIR = "public/logo";

/** Brightness below this is treated as background and made fully transparent. */
const FLOOR = 18;
/** Brightness above this is treated as solid artwork. */
const CEILING = 120;

async function keyOutBlack(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = Buffer.from(data);
  for (let i = 0; i < px.length; i += info.channels) {
    const r = px[i], g = px[i + 1], b = px[i + 2];
    const brightness = Math.max(r, g, b);

    let alpha;
    if (brightness <= FLOOR) alpha = 0;
    else if (brightness >= CEILING) alpha = 255;
    else alpha = Math.round(((brightness - FLOOR) / (CEILING - FLOOR)) * 255);

    px[i + 3] = alpha;
  }

  return sharp(px, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png();
}

await mkdir(OUT_DIR, { recursive: true });

// --- full lockup: wordmark + tagline + compass -------------------------------
const keyed = await keyOutBlack(SOURCE);
await keyed
  .clone()
  .trim({ threshold: 1 })           // strip the transparent padding
  .resize({ width: 900, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true })
  .toFile(`${OUT_DIR}/travellingsouls-logo.png`);

const full = await sharp(`${OUT_DIR}/travellingsouls-logo.png`).metadata();
console.log(`logo:  ${full.width}x${full.height}  ${(full.size / 1024).toFixed(0)}KB`);

// --- mark only: the compass, for the favicon and tight spaces ----------------
// After trimming, the compass occupies roughly the top 62% of the lockup.
// Cropping to a centred square around it keeps the favicon legible at 32px,
// where the wordmark would be an unreadable smear.
const trimmed = await keyOutBlack(SOURCE).then((s) =>
  s.trim({ threshold: 1 }).raw().toBuffer({ resolveWithObject: true }),
);

const { width: tw, height: th } = trimmed.info;

// Take the compass band at FULL width, then letterbox it into a square with
// transparent padding. Cropping a square out of the width instead would slice
// the feathers off the left and the compass arrow off the right.
await sharp(trimmed.data, {
  raw: { width: tw, height: th, channels: trimmed.info.channels },
})
  .extract({ left: 0, top: 0, width: tw, height: Math.round(th * 0.62) })
  .trim({ threshold: 1 })
  .resize(512, 512, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9, palette: true })
  .toFile(`${OUT_DIR}/travellingsouls-mark.png`);

const mark = await sharp(`${OUT_DIR}/travellingsouls-mark.png`).metadata();
console.log(`mark:  ${mark.width}x${mark.height}  ${(mark.size / 1024).toFixed(0)}KB`);

// --- favicon ----------------------------------------------------------------
// Next serves app/icon.png as the tab icon via its file convention.
await sharp(`${OUT_DIR}/travellingsouls-mark.png`)
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile("app/icon.png");
console.log("icon:  app/icon.png 180x180");
