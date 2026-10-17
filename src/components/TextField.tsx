import type { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
};
export function TextField({ name, label, type = "text" }: Props) {
  const { register, getFieldState, formState } = useFormContext();
  const { error } = getFieldState(name, formState);

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input id={name} type={type} aria-invalid={!!error} {...register(name)} />
      <FieldError errors={[error]} />
    </Field>
  );
}
