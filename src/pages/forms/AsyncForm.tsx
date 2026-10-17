import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormPage } from "@/layout/FormPage";
import {
  registrationSchema,
  type RegistrationValues,
} from "@/schemas/registration";

const defaultValues: RegistrationValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const takenUsernames = ["ahmed", "eldeep", "idris"];

const isUsernameTaken = (username: string) =>
  new Promise<boolean>((resolve) =>
    setTimeout(() => resolve(takenUsernames.includes(username)), 500),
  );

export default function AsyncForm() {
  const [checking, setChecking] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    trigger,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
  });

  const checkUsername = async () => {
    if (!(await trigger("username"))) return;
    setChecking(true);
    const taken = await isUsernameTaken(getValues("username"));
    setChecking(false);
    if (taken)
      setError("username", {
        type: "server",
        message: "Username is taken",
      });
  };

  const suggestUsername = () => {
    const local = getValues("email")
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "");
    setValue("username", local, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = async (data: RegistrationValues) => {
    if (await isUsernameTaken(data.username)) {
      setError(
        "username",
        { type: "server", message: "Username is taken" },
        { shouldFocus: true },
      );
      return;
    }
    console.log(data);
    // TODO: call api
  };

  return (
    <FormPage title="Manual errors and async check">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <FieldGroup>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              aria-invalid={!!errors.email}
              {...register("email", { onBlur: () => trigger("email") })}
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field data-invalid={!!errors.username}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <div className="flex gap-2">
              <Input
                id="username"
                aria-invalid={!!errors.username}
                {...register("username", {
                  onChange: () => clearErrors("username"),
                  onBlur: checkUsername,
                })}
              />
              <Button type="button" variant="outline" onClick={suggestUsername}>
                Suggest from email
              </Button>
            </div>
            {checking && <FieldDescription>Checking...</FieldDescription>}
            <FieldError errors={[errors.username]} />
          </Field>

          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <FieldError errors={[errors.password]} />
          </Field>

          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            <FieldError errors={[errors.confirmPassword]} />
          </Field>
        </FieldGroup>

        <Button type="submit" disabled={isSubmitting}>
          Create account
        </Button>
      </form>
    </FormPage>
  );
}
