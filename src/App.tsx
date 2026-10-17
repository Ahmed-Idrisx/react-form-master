import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AppLayout } from "@/layout/AppLayout"
import Home from "@/pages/Home"
import MultiStepForm from "@/pages/forms/MultiStepForm"
import NestedForm from "@/pages/forms/NestedForm"
import FieldArrayForm from "@/pages/forms/FieldArrayForm"
import ConditionalForm from "@/pages/forms/ConditionalForm"
import AsyncForm from "@/pages/forms/AsyncForm"
import ControlledForm from "@/pages/forms/ControlledForm"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="multi-step" element={<MultiStepForm />} />
          <Route path="nested" element={<NestedForm />} />
          <Route path="field-array" element={<FieldArrayForm />} />
          <Route path="conditional" element={<ConditionalForm />} />
          <Route path="async" element={<AsyncForm />} />
          <Route path="controlled" element={<ControlledForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
