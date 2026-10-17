import {
  useFieldArray,
  useForm,
  useWatch,
  type Control,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormPage } from "@/layout/FormPage";
import {
  invoiceSchema,
  type InvoiceValues,
  type LineItem,
} from "@/schemas/invoice";

const emptyItem: LineItem = { description: "", quantity: 1, price: 0 };

const defaultValues: InvoiceValues = {
  customer: "",
  items: [{ description: "Design work", quantity: 10, price: 45 }],
};

function InvoiceTotal({ control }: { control: Control<InvoiceValues> }) {
  const items = useWatch({ control, name: "items" });
  const total = items.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
    0,
  );

  return <p className="text-sm font-medium">Total: {total.toFixed(2)}</p>;
}

export default function FieldArrayForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });
  const { fields, append, remove, insert, move } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: InvoiceValues) => {
    console.log(data);
    // TODO: call api
  };
  const itemsError = errors.items?.root ?? errors.items;

  return (
    <FormPage title="Dynamic field array">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <Field data-invalid={!!errors.customer}>
          <FieldLabel htmlFor="customer">Customer</FieldLabel>
          <Input
            id="customer"
            aria-invalid={!!errors.customer}
            {...register("customer")}
          />
          <FieldError errors={[errors.customer]} />
        </Field>

        <div className="space-y-3">
          <h2 className="text-sm font-medium">Line items</h2>
          {itemsError?.message && <FieldError>{itemsError.message}</FieldError>}

          {fields.map((field, index) => {
            const rowErrors = errors.items?.[index];
            return (
              // key must be field.id, not index, or inputs get mixed up on move/remove
              <div key={field.id} className="space-y-2 rounded-md border p-3">
                <div className="grid grid-cols-[1fr_6rem_7rem] gap-3">
                  <Field data-invalid={!!rowErrors?.description}>
                    <FieldLabel htmlFor={`items.${index}.description`}>
                      Description
                    </FieldLabel>
                    <Input
                      id={`items.${index}.description`}
                      aria-invalid={!!rowErrors?.description}
                      {...register(`items.${index}.description`)}
                    />
                    <FieldError errors={[rowErrors?.description]} />
                  </Field>
                  <Field data-invalid={!!rowErrors?.quantity}>
                    <FieldLabel htmlFor={`items.${index}.quantity`}>
                      Qty
                    </FieldLabel>
                    <Input
                      id={`items.${index}.quantity`}
                      type="number"
                      aria-invalid={!!rowErrors?.quantity}
                      {...register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                    />
                    <FieldError errors={[rowErrors?.quantity]} />
                  </Field>
                  <Field data-invalid={!!rowErrors?.price}>
                    <FieldLabel htmlFor={`items.${index}.price`}>
                      Price
                    </FieldLabel>
                    <Input
                      id={`items.${index}.price`}
                      type="number"
                      step="0.01"
                      aria-invalid={!!rowErrors?.price}
                      {...register(`items.${index}.price`, {
                        valueAsNumber: true,
                      })}
                    />
                    <FieldError errors={[rowErrors?.price]} />
                  </Field>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={index === 0}
                    onClick={() => move(index, index - 1)}
                  >
                    Up
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={index === fields.length - 1}
                    onClick={() => move(index, index + 1)}
                  >
                    Down
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => insert(index + 1, emptyItem)}
                  >
                    Insert below
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}

          <Button
            type="button"
            variant="outline"
            onClick={() => append(emptyItem)}
          >
            Add item
          </Button>
        </div>

        <InvoiceTotal control={control} />

        <Button type="submit">Submit</Button>
      </form>
    </FormPage>
  );
}
