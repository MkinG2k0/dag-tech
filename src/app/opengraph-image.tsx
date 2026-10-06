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
          background: "#f1efe8",
          color: "#11110f",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          border: "16px solid #11110f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 22,
              height: 22,
              background: "#d8ff3e",
              border: "3px solid #11110f",
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>
            DAG TECH
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.02,
              textTransform: "uppercase",
              letterSpacing: -1.4,
              maxWidth: 920,
            }}
          >
            Цифровые продукты без лишнего шума
          </div>
          <div style={{ fontSize: 28, color: "#3157ff", fontWeight: 700 }}>
            Мобильные приложения, CRM, SaaS и автоматизация под ключ
          </div>
        </div>
      </div>
    ),
    size,
  );
}
