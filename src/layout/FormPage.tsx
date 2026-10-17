import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function FormPage({ title, children }: Props) {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      {children}
    </div>
  );
}
