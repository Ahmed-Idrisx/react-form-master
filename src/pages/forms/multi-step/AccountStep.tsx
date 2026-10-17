import { FieldGroup } from "@/components/ui/field"
import { TextField } from "@/components/TextField"

export function AccountStep() {
  return (
    <FieldGroup>
      <TextField name="email" label="Email" type="email" />
      <TextField name="password" label="Password" type="password" />
    </FieldGroup>
  )
}
