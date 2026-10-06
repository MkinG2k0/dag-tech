import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#e7f3f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 18,
            background: "linear-gradient(135deg, #7eeaf6 0%, #2ec4d6 45%, #e2b86a 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85)",
          }}
        />
      </div>
    ),
    size,
  );
}
