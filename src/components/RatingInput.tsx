import {
  useController,
  type Control,
  type FieldPathByValue,
  type FieldValues,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPathByValue<T, number>;
};

export function RatingInput<T extends FieldValues>({
  control,
  name,
}: Props<T>) {
  const { field, fieldState } = useController({ control, name });

  return (
    <div className="space-y-2">
      <div className="flex gap-1" role="radiogroup" onBlur={field.onBlur}>
        {[1, 2, 3, 4, 5].map((n, i) => (
          <Button
            key={n}
            ref={i === 0 ? field.ref : undefined}
            type="button"
            size="sm"
            role="radio"
            aria-checked={field.value === n}
            variant={field.value >= n ? "default" : "outline"}
            onClick={() => field.onChange(n)}
          >
            {n}
          </Button>
        ))}
      </div>
      <FieldError errors={[fieldState.error]} />
    </div>
  );
}
