import { useFormContext } from "react-hook-form";
import type { MultiStepValues } from "@/schemas/multiStep";

export function ReviewStep() {
  const { getValues } = useFormContext<MultiStepValues>();

  const values = getValues();

  const rows: [string, string][] = [
    ["Email", values.email],
    ["Password", "*".repeat(values.password.length)],
    ["Name", `${values.firstName} ${values.lastName}`],
    ["Bio", values.bio || "-"],
  ];

  return (
    <dl className="grid grid-cols-[8rem_1fr] gap-y-2 text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-muted-foreground">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
