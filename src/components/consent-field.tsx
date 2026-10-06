import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function ConsentField({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="consent">
      <input
        type="checkbox"
        name="consent"
        checked={checked}
        required
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>
        Соглашаюсь на обработку персональных данных согласно{" "}
        <Link href={siteConfig.privacyPath}>политике</Link>
      </span>
    </label>
  );
}
