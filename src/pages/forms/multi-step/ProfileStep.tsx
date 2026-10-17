import { useFormContext } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { TextField } from "@/components/TextField";
import type { MultiStepValues } from "@/schemas/multiStep";

export function ProfileStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<MultiStepValues>();

  return (
    <FieldGroup>
      <div className="grid grid-cols-2 gap-4">
        <TextField name="firstName" label="First name" />
        <TextField name="lastName" label="Last name" />
      </div>
      <Field data-invalid={!!errors.bio}>
        <FieldLabel htmlFor="bio">Bio (optional)</FieldLabel>
        <Textarea id="bio" aria-invalid={!!errors.bio} {...register("bio")} />
        <FieldError errors={[errors.bio]} />
      </Field>
    </FieldGroup>
  );
}
