import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormPage } from "@/layout/FormPage";
import {
  conditionalSchema,
  type ConditionalValues,
} from "@/schemas/conditional";

const defaultValues: ConditionalValues = {
  accountType: "personal",
  fullName: "",
  email: "",
  hasPhone: false,
  phone: "",
};

function PhoneFields() {
  const { control, register, getFieldState, formState, unregister } =
    useFormContext<ConditionalValues>();

  const hasPhone = useWatch({ control, name: "hasPhone" });
  const phoneError = getFieldState("phone", formState).error;

  return (
    <>
      <Controller
        control={control}
        name="hasPhone"
        render={({ field }) => (
          <Field orientation="horizontal">
            <Checkbox
              id="hasPhone"
              ref={field.ref}
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                if (!checked) unregister("phone");
              }}
            />
            <FieldLabel htmlFor="hasPhone">Add a phone number</FieldLabel>
          </Field>
        )}
      />

      {hasPhone && (
        <Field data-invalid={!!phoneError}>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input
            id="phone"
            type="tel"
            aria-invalid={!!phoneError}
            {...register("phone")}
          />
          <FieldError errors={[phoneError]} />
        </Field>
      )}
    </>
  );
}

export default function ConditionalForm() {
  const form = useForm<ConditionalValues>({
    resolver: zodResolver(conditionalSchema),
    defaultValues,
  });
  const { control, register, handleSubmit, watch, getFieldState, formState } =
    form;
  const accountType = watch("accountType");
  const errorOf = (name: "email" | "fullName" | "companyName" | "vatNumber") =>
    getFieldState(name, formState).error;

  const onSubmit = (data: ConditionalValues) => {
    console.log(data);
    // TODO: call api
  };

  return (
    <FormPage title="Conditional validation">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <FieldGroup>
            <Controller
              control={control}
              name="accountType"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Account type</FieldLabel>
                  <RadioGroup
                    ref={field.ref}
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-6"
                  >
                    <Field orientation="horizontal" className="w-auto">
                      <RadioGroupItem id="type-personal" value="personal" />
                      <FieldLabel htmlFor="type-personal">Personal</FieldLabel>
                    </Field>
                    <Field orientation="horizontal" className="w-auto">
                      <RadioGroupItem id="type-company" value="company" />
                      <FieldLabel htmlFor="type-company">Company</FieldLabel>
                    </Field>
                  </RadioGroup>
                </Field>
              )}
            />

            {accountType === "personal" ? (
              <Field data-invalid={!!errorOf("fullName")}>
                <FieldLabel htmlFor="fullName">Full name</FieldLabel>
                <Input
                  id="fullName"
                  aria-invalid={!!errorOf("fullName")}
                  {...register("fullName", { shouldUnregister: true })}
                />
                <FieldError errors={[errorOf("fullName")]} />
              </Field>
            ) : (
              <>
                <Field data-invalid={!!errorOf("companyName")}>
                  <FieldLabel htmlFor="companyName">Company name</FieldLabel>
                  <Input
                    id="companyName"
                    aria-invalid={!!errorOf("companyName")}
                    {...register("companyName", { shouldUnregister: true })}
                  />
                  <FieldError errors={[errorOf("companyName")]} />
                </Field>
                <Field data-invalid={!!errorOf("vatNumber")}>
                  <FieldLabel htmlFor="vatNumber">VAT number</FieldLabel>
                  <Input
                    id="vatNumber"
                    aria-invalid={!!errorOf("vatNumber")}
                    {...register("vatNumber", { shouldUnregister: true })}
                  />
                  <FieldError errors={[errorOf("vatNumber")]} />
                </Field>
              </>
            )}

            <Field data-invalid={!!errorOf("email")}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                aria-invalid={!!errorOf("email")}
                {...register("email")}
              />
              <FieldError errors={[errorOf("email")]} />
            </Field>

            <PhoneFields />
          </FieldGroup>

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </FormPage>
  );
}
