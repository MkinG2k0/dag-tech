import { ImageResponse } from "next/og";

export const alt = "DAG TECH — цифровые продукты для бизнеса";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          color: "#ffffff",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 920,
            height: 920,
            borderRadius: 920,
            border: "2px solid rgba(59, 130, 246, 0.7)",
            left: 140,
            top: -220,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 680,
            height: 680,
            borderRadius: 680,
            border: "1px solid rgba(244, 114, 182, 0.55)",
            left: 260,
            top: -80,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 460,
            height: 460,
            borderRadius: 460,
            border: "1px solid rgba(74, 222, 128, 0.45)",
            left: 370,
            top: 40,
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: 64,
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>
            DAG TECH
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                fontSize: 68,
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: -2,
                maxWidth: 980,
              }}
            >
              Цифровые продукты без лишнего шума
            </div>
            <div style={{ fontSize: 26, color: "#dbeafe", fontWeight: 600 }}>
              Мобильные приложения, CRM, SaaS и автоматизация под ключ
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
