import { ImageResponse } from "next/og"

import { SITE } from "@/lib/constants"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "hsl(162, 22%, 5%)",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 15% 0%, hsla(152, 74%, 20%, 0.5), transparent), radial-gradient(ellipse 60% 50% at 100% 100%, hsla(165, 37%, 25%, 0.35), transparent)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: "hsl(152, 74%, 58%)",
              }}
            />
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: "hsl(165, 37%, 41%)",
              }}
            />
          </div>
          <span style={{ fontSize: 40, fontWeight: 700, color: "hsl(140, 10%, 97%)" }}>Grentech</span>
        </div>

        <div
          style={{
            marginTop: 56,
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "hsl(140, 10%, 97%)",
            maxWidth: 920,
          }}
        >
          {SITE.tagline}
        </div>

        <div style={{ marginTop: 28, fontSize: 26, color: "hsl(150, 12%, 68%)", maxWidth: 860 }}>
          {SITE.description}
        </div>
      </div>
    ),
    { ...size },
  )
}
