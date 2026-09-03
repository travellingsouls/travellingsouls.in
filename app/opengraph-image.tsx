import { ImageResponse } from "next/og";

/**
 * Default social share image, generated at build time.
 *
 * The business plans to promote this site through social media, where a link
 * with no preview image renders as a bare grey box and reads as untrustworthy.
 * This is the fallback for every route that does not supply its own.
 *
 * Drawn rather than photographed so it stays on-brand and needs no licensing.
 * Only system fonts are used - embedding Fraunces here would mean shipping a
 * font binary for one image.
 */
export const alt = "TravellingSouls - curated journeys across North India and Goa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #0a1220 0%, #111c2e 55%, #1a283d 100%)",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "44px", height: "3px", background: "#b99a55" }} />
          <div
            style={{
              color: "#cdb073",
              fontSize: "24px",
              letterSpacing: "6px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            ROHTAK · NORTH INDIA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#fbf9f5", fontSize: "86px", lineHeight: 1.05 }}>
            TravellingSouls
          </div>
          <div
            style={{
              color: "#8798ae",
              fontSize: "34px",
              marginTop: "20px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Curated journeys across North India and Goa
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#5c6f8a",
            fontSize: "24px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span>Group departures · Customized trips</span>
          <span style={{ color: "#b99a55" }}>travellingsouls.in</span>
        </div>
      </div>
    ),
    size,
  );
}
