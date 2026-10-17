import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RatingInput } from "@/components/RatingInput";
import { FormPage } from "@/layout/FormPage";
import { controlledSchema, type ControlledValues } from "@/schemas/controlled";

const planItems = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "team", label: "Team" },
];

const defaultValues: ControlledValues = {
  nickname: "",
  plan: "free",
  acceptTerms: false,
  rating: 0,
};

export default function ControlledForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ControlledValues>({
    resolver: zodResolver(controlledSchema),
    defaultValues,
  });

  const onSubmit = (data: ControlledValues) => {
    console.log(data);
    // TODO: call api
  };

  return (
    <FormPage title="Controlled vs uncontrolled">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <FieldSet>
          <FieldLegend>Uncontrolled: register</FieldLegend>
          <Field data-invalid={!!errors.nickname}>
            <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
            <Input
              id="nickname"
              aria-invalid={!!errors.nickname}
              {...register("nickname")}
            />
            <FieldError errors={[errors.nickname]} />
          </Field>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Controlled: Controller</FieldLegend>
          <FieldGroup>
            <Controller
              control={control}
              name="plan"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Plan</FieldLabel>
                  <Select
                    items={planItems}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      ref={field.ref}
                      onBlur={field.onBlur}
                      aria-invalid={fieldState.invalid}
                      className="w-48"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {planItems.map((plan) => (
                        <SelectItem key={plan.value} value={plan.value}>
                          {plan.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />

            <Controller
              control={control}
              name="acceptTerms"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Field orientation="horizontal">
                    <Checkbox
                      id="acceptTerms"
                      ref={field.ref}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      onBlur={field.onBlur}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldLabel htmlFor="acceptTerms">
                      I accept the terms
                    </FieldLabel>
                  </Field>
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Custom component: useController</FieldLegend>
          <Field>
            <FieldLabel>Rating</FieldLabel>
            <RatingInput control={control} name="rating" />
          </Field>
        </FieldSet>

        <Button type="submit">Submit</Button>
      </form>
    </FormPage>
  );
}
