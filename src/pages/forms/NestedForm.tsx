import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AddressFields } from "@/components/AddressFields";
import { FormPage } from "@/layout/FormPage";
import { nestedSchema, type NestedValues } from "@/schemas/nested";

const emptyAddress = { street: "", city: "", zip: "", country: "" };

const defaultValues: NestedValues = {
  user: { firstName: "", lastName: "", address: emptyAddress },
  company: { name: "", address: emptyAddress },
};

export default function NestedForm() {
  const form = useForm<NestedValues>({
    resolver: zodResolver(nestedSchema),
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = (data: NestedValues) => {
    console.log(data);
    // TODO: call api
    reset();
  };

  return (
    <FormPage title="Nested form">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-8"
        >
          <FieldSet>
            <FieldLegend>User</FieldLegend>
            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.user?.firstName}>
                <FieldLabel htmlFor="user.firstName">First name</FieldLabel>
                <Input
                  id="user.firstName"
                  aria-invalid={!!errors.user?.firstName}
                  {...register("user.firstName")}
                />
                <FieldError errors={[errors.user?.firstName]} />
              </Field>
              <Field data-invalid={!!errors.user?.lastName}>
                <FieldLabel htmlFor="user.lastName">Last name</FieldLabel>
                <Input
                  id="user.lastName"
                  aria-invalid={!!errors.user?.lastName}
                  {...register("user.lastName")}
                />
                <FieldError errors={[errors.user?.lastName]} />
              </Field>
            </div>
          </FieldSet>

          <AddressFields legend="User address" prefix="user.address" />

          <FieldGroup>
            <Field data-invalid={!!errors.company?.name}>
              <FieldLabel htmlFor="company.name">Company name</FieldLabel>
              <Input
                id="company.name"
                aria-invalid={!!errors.company?.name}
                {...register("company.name")}
              />
              <FieldError errors={[errors.company?.name]} />
            </Field>
          </FieldGroup>

          <AddressFields legend="Company address" prefix="company.address" />

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </FormPage>
  );
}
