import type { ReactNode } from "react";

type ServiceIconName = "phone" | "crm" | "saas" | "auto";

const icons: Record<ServiceIconName, ReactNode> = {
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10 18.5h4" />
    </>
  ),
  crm: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 9v9" />
    </>
  ),
  saas: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16" />
      <path d="M12 9h6" />
      <path d="M12 13h6" />
      <path d="M12 17h4" />
    </>
  ),
  auto: (
    <>
      <path d="M13 3 5.5 13.5h5L9.5 21 18.5 9.5h-5L13 3z" />
    </>
  ),
};

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

export type { ServiceIconName };
