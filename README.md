# react-form-master

A practice project for react-hook-form. Six forms, each on its own route, each focused on one part of the library. Submitting a form logs the data to the console; there are no API calls.

Stack: React 19 + TypeScript (strict), Vite, Tailwind v4, shadcn/ui (base-nova style, Base UI primitives), react-hook-form, Zod 4 with `@hookform/resolvers/zod`, react-router-dom.

## Run

```bash
npm install
npm run dev
```

Other scripts: `npm run build` (typecheck + build), `npm run lint`.

The shadcn components in `src/components/ui` are already in the repo. To add them to a fresh project:

```bash
npx shadcn@latest add button input label select checkbox radio-group textarea field
```

shadcn's newer `field` component (`Field`, `FieldLabel`, `FieldError`, ...) is used in place of the older `form` component.

## Structure

```
src/
  layout/         AppLayout (nav + outlet), FormPage, nav routes
  pages/          Home (API -> form table)
  pages/forms/    one file per form; multi-step/ holds the step components
  schemas/        one Zod schema per form, types via z.infer
  components/     TextField, AddressFields, RatingInput
  components/ui/  shadcn components (generated)
```

## The forms

**Multi-step** (`/multi-step`) - Account, Profile, Review sharing one `useForm` through `FormProvider`. Steps use `useFormContext`. Next calls `trigger(stepFields)` so only the current step is validated. Values survive Back/Next because unmounted inputs stay registered. Only the last step runs `handleSubmit`; then `reset()`.
APIs: `FormProvider`, `useFormContext`, `trigger`, `getValues`, `reset`.

**Nested** (`/nested`) - `user.address.city`-style names producing nested data, nested Zod schema, errors read as `errors.user?.address?.city`, `reset()` after submit. `AddressFields` is reused for two addresses by passing a name prefix.
APIs: `FormProvider`, `useFormContext`, `getFieldState`, `reset`, nested `register` paths.

**Field array** (`/field-array`) - Invoice line items with `useFieldArray` (`append`, `remove`, `insert`, `move`), per-row errors, an array-level "at least one item" error (`errors.items.root`), and a total computed with `useWatch` in a separate component.
APIs: `useFieldArray`, `useWatch`, `valueAsNumber`.

**Conditional** (`/conditional`) - `discriminatedUnion` on account type (company requires a VAT number) plus a `superRefine` for "phone required when hasPhone". `watch` decides which fields render; hidden branch fields use `shouldUnregister`, and unchecking the phone toggle calls `unregister('phone')`.
APIs: `watch`, `useWatch`, `Controller`, `unregister`, `shouldUnregister`.

**Manual errors & async** (`/async`) - Username availability checked on blur against a 500ms fake lookup (admin, root and john are taken); `setError` when taken, `clearErrors` on change, re-checked on submit because `handleSubmit` replaces manual errors. Email uses `trigger('email')` on blur. "Suggest from email" uses `getValues` and `setValue(..., { shouldValidate, shouldDirty, shouldTouch })`.
APIs: `setError`, `clearErrors`, `trigger`, `setValue`, `getValues`.

**Controlled vs uncontrolled** (`/controlled`) - `register` on a native input next to shadcn `Select`/`Checkbox` through `Controller`, and a custom `RatingInput` built with `useController`. The registered input keeps its value in the DOM, so typing doesn't re-render React; a `Controller` change re-renders only that controller.
APIs: `register`, `Controller`, `useController`.
