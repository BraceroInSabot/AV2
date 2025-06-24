import { Trash2, Pencil, Eye } from 'lucide-solid';

export default function Employees() {
  const employees = [
    { id: 1, name: "João Silva", role: "Desenvolvedor Backend" },
    { id: 2, name: "Maria Oliveira", role: "Analista de Dados" },
    { id: 3, name: "Carlos Santos", role: "Engenheiro de Software" },
    { id: 4, name: "Ana Costa", role: "Product Manager" },
    { id: 5, name: "Fernanda Lima", role: "UX/UI Designer" },
    { id: 6, name: "Ricardo Pereira", role: "DevOps Engineer" },
  ];

  return (
    <div class="width-full h-full bg-white">
      <div class="bg-white p-4">
        <div class="breadcrumbs text-sm">
          <ul>
            <li><a href='/'>Departamento Nome</a></li>
            <li>Funcionarios</li>
          </ul>
        </div>
        <h1 class="font-bold pl-4 text-4xl">Funcionários</h1>
        <div class="">
          {employees.map((employee) => (
            <ul class="list bg-base-100 rounded-box shadow-md">                
                <li class="list-row mt-1">
                    <div>
                      <img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
                      <div>
                      <div>
                        Dio Lupa
                      </div>
                      <div class="text-xs uppercase font-semibold opacity-60">
                        Remaining Reason
                      </div>
                    </div>
                    <button class="btn btn-square btn-ghost">
                        <Eye style={"color: #0080ff"} />
                    </button>
                    <button class="btn btn-square btn-ghost">
                        <Pencil style={"color: #DAA520"} />
                    </button>
                    <button class="btn btn-square btn-ghost">
                        <Trash2 style={"color: red"}/>
                    </button>
                </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
