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
          background:
            "radial-gradient(ellipse 70% 60% at 8% 0%, #c5eef5 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 100% 10%, #f6e3c0 0%, transparent 50%), linear-gradient(180deg, #eef8fb 0%, #dceef3 100%)",
          color: "#102632",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "12px 18px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.45)",
            border: "1px solid rgba(255,255,255,0.7)",
            width: "auto",
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 16,
              background: "linear-gradient(135deg, #2ec4d6 0%, #e2b86a 100%)",
            }}
          />
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -1 }}>
            DAG TECH
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -1.8,
              maxWidth: 940,
            }}
          >
            Цифровые продукты без лишнего шума
          </div>
          <div style={{ fontSize: 26, color: "#148a9c", fontWeight: 600 }}>
            Мобильные приложения, CRM, SaaS и автоматизация под ключ
          </div>
        </div>
      </div>
    ),
    size,
  );
}
