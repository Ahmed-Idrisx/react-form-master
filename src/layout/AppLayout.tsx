import { NavLink, Outlet } from "react-router-dom";
import { formRoutes } from "./nav";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "block font-medium"
    : "block text-muted-foreground hover:text-foreground";

export function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <nav className="w-72 shrink-0 space-y-5 border-r p-4">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        {formRoutes.map((route) => (
          <NavLink key={route.path} to={route.path} className={linkClass}>
            {route.label}
          </NavLink>
        ))}
      </nav>

      <main className="w-full max-w-3xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
