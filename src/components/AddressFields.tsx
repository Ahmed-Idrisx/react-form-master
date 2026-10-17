import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { TextField } from "./TextField";

type Props = {
  legend: string;
  prefix: string;
};

export function AddressFields({ legend, prefix }: Props) {
  return (
    <FieldSet>
      <FieldLegend>{legend}</FieldLegend>
      <FieldGroup>
        <TextField name={`${prefix}.street`} label="Street" />
        <div className="grid grid-cols-2 gap-4">
          <TextField name={`${prefix}.city`} label="City" />
          <TextField name={`${prefix}.zip`} label="ZIP" />
        </div>
        <TextField name={`${prefix}.country`} label="Country" />
      </FieldGroup>
    </FieldSet>
  );
}
