/**
 * Produces the favicon from the supplied logo.
 *
 * The logo is used EXACTLY as supplied everywhere on the site - the black
 * background is deliberately kept, and the site's page ground is pure black so
 * the square blends invisibly. Nothing here alters the artwork; this only
 * resizes it, because shipping a 1024x1024 file as a tab icon wastes bandwidth
 * on every page load.
 *
 * Run:  node scripts/process-logo.mjs
 * Only needed when the source logo changes; the output is committed.
 */
import sharp from "sharp";

const SOURCE = "public/logo/travellingsouls-logo.jpeg";

await sharp(SOURCE)
  .resize(180, 180, { fit: "cover" })
  .png({ compressionLevel: 9 })
  .toFile("app/icon.png");

const meta = await sharp("app/icon.png").metadata();
console.log(`favicon: app/icon.png ${meta.width}x${meta.height}`);
