import { Link } from "react-router-dom";

const multiStep = { path: "/multi-step", label: "Multi-step" };
const nested = { path: "/nested", label: "Nested" };
const fieldArray = { path: "/field-array", label: "Field array" };
const conditional = { path: "/conditional", label: "Conditional" };
const async = { path: "/async", label: "Manual errors & async" };
const controlled = { path: "/controlled", label: "Controlled vs uncontrolled" };

const apiUsage = [
  { api: "watch", where: [conditional] },
  { api: "useWatch", where: [fieldArray, conditional] },
  { api: "setValue", where: [async] },
  { api: "getValues", where: [multiStep, async] },
  { api: "reset", where: [multiStep, nested] },
  { api: "Controller", where: [conditional, controlled] },
  { api: "useController", where: [controlled] },
  { api: "FormProvider", where: [multiStep, nested, conditional] },
  { api: "useFormContext", where: [multiStep, nested, conditional] },
  { api: "useFieldArray", where: [fieldArray] },
  { api: "setError", where: [async] },
  { api: "clearErrors", where: [async] },
  { api: "trigger", where: [multiStep, async] },
];

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">RHF APIs</h1>
      <table className="w-full text-left text-sm">
        <thead className="border-b">
          <tr>
            <th className="py-2 pr-4 font-medium">API</th>
            <th className="py-2 font-medium">Used in</th>
          </tr>
        </thead>
        <tbody>
          {apiUsage.map((row) => (
            <tr key={row.api} className="border-b">
              <td className="py-2 pr-4">
                <code>{row.api}</code>
              </td>
              <td className="py-2">
                {row.where.map((form, i) => (
                  <span key={form.path}>
                    {i > 0 && ", "}
                    <Link to={form.path} className="underline">
                      {form.label}
                    </Link>
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
