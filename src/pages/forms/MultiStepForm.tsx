import { useState, type ComponentType, type FormEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormPage } from "@/layout/FormPage";
import { multiStepSchema, type MultiStepValues } from "@/schemas/multiStep";
import { AccountStep } from "./multi-step/AccountStep";
import { ProfileStep } from "./multi-step/ProfileStep";
import { ReviewStep } from "./multi-step/ReviewStep";

type StepConfig = {
  title: string;
  fields: (keyof MultiStepValues)[];
  component: ComponentType;
};

const steps: StepConfig[] = [
  { title: "Account", fields: ["email", "password"], component: AccountStep },
  {
    title: "Profile",
    fields: ["firstName", "lastName", "bio"],
    component: ProfileStep,
  },
  { title: "Review", fields: [], component: ReviewStep },
];

const defaultValues: MultiStepValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  bio: "",
};

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const form = useForm<MultiStepValues>({
    resolver: zodResolver(multiStepSchema),
    defaultValues,
  });

  const isLast = step === steps.length - 1;
  const Step = steps[step].component;

  const next = async () => {
    const valid = await form.trigger(steps[step].fields);
    if (valid) setStep(step + 1);
  };

  const onSubmit = (data: MultiStepValues) => {
    console.log(data);
    // TODO: call api
    form.reset();
    setStep(0);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (isLast) return form.handleSubmit(onSubmit)(e);
    e.preventDefault();
    next();
  };

  return (
    <FormPage title="Multi-step form">
      <p className="text-sm text-muted-foreground">
        Step {step + 1} of {steps.length}:{" "}
        {steps.map((s) => s.title).join(" / ")}
      </p>

      <FormProvider {...form}>
        <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
          <h2 className="font-medium">{steps[step].title}</h2>
          <Step />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
            <Button type="submit">{isLast ? "Submit" : "Next"}</Button>
          </div>
        </form>
      </FormProvider>
    </FormPage>
  );
}
