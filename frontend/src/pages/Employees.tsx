import { createResource } from 'solid-js';
import { useParams } from '@solidjs/router';
import { getDepartmentEmployees } from '../api/departaments';
import { Trash2, Pencil, Eye } from 'lucide-solid';
import { Show, For } from 'solid-js';

export default function Employees() {
  const params = useParams();
  const [employees] = createResource(() => Number(params.id), getDepartmentEmployees);

  return (
    <div class="width-full h-full bg-white">
      <div class="bg-white p-4">
        <div class="breadcrumbs text-sm pl-4">
          <ul>
            <li><a href='/'>Departamento Nome</a></li>
            <li>Funcionários</li>
          </ul>
        </div>

        <h1 class="font-bold pl-4 text-4xl">Funcionários</h1>

        <Show when={employees()} fallback={<p class="p-4">Carregando funcionários...</p>}>
          <For each={employees()?.data?.employees}>
            {(employee) => (
              <ul class="list bg-base-100 rounded-box shadow-md mt-2">
                <li class="list-row flex items-center gap-4 px-4 py-2">
                  <img
                    class="size-10 rounded-box"
                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                    alt={`Foto de ${employee.name}`}
                  />
                  <div class="flex-1">
                    <div>{employee.name}</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{employee.function_title}</div>
                  </div>
                  <div class="flex gap-1">
                    <button class="btn btn-square btn-ghost">
                      <Eye style={{ color: '#0080ff' }} />
                    </button>
                    <button class="btn btn-square btn-ghost">
                      <Pencil style={{ color: '#DAA520' }} />
                    </button>
                    <button class="btn btn-square btn-ghost">
                      <Trash2 style={{ color: 'red' }} />
                    </button>
                  </div>
                </li>
              </ul>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
}
