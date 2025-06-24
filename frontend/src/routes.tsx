import { Route } from "@solidjs/router";
import Department from "./pages/Departaments";
import NotFoundPage from "./pages/NotFoundPage";
import Employees from "./pages/Employees";
import EmployeeForm from "./pages/EmployeeForm";
import DepartmentForm from "./pages/DepartmentForm";
import DepartmentEditForm from "./pages/DepartmentsUpdate";

export default function RouterMap() {
  return (
    <>
      <Route path="/" component={Department} />
      <Route path="/*" component={NotFoundPage} />
      <Route path="departamento/:id/alterar" component={DepartmentEditForm} />
      <Route path="departamento/:id/funcionarios" component={Employees} />
      <Route path="departamento/:id/funcionario/criar" component={EmployeeForm} />
      <Route path="departamento/criar" component={DepartmentForm} />
    </>
  );
}
