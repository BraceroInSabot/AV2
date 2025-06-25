import { createResource, createSignal, Show, For, onMount } from 'solid-js';
import { useParams } from '@solidjs/router';
import {
  getDepartmentEmployees,
  viewDepartmentEmployee,
  deleteDepartmentEmployee
} from '../api/departaments';
import { Trash2, Pencil, Eye, X } from 'lucide-solid';

type EmployeeSummary = {
  id: number;
  name: string;
  function_title: string;
};

type EmployeeDetails = {
  id: number;
  name: string;
  function: {
    title: string;
    salary: string;
  };
  email: string;
  phone: string;
  admission_date: string;
  salary: string;
  hire_date: string;
};

export default function Employees() {
  let inputRef: HTMLInputElement | undefined;

  const params = useParams();
  const [employees, { refetch }] = createResource(() => Number(params.id), getDepartmentEmployees);

  const [modalOpen, setModalOpen] = createSignal(false);
  const [selectedEmployee, setSelectedEmployee] = createSignal<EmployeeDetails | null>(null);

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        inputRef?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  async function handleView(employee: EmployeeSummary) {
    try {
      const data = await viewDepartmentEmployee(Number(params.id), employee.id);
      setSelectedEmployee(data);
      setModalOpen(true);
    } catch (err) {
      console.error('Erro ao carregar detalhes do funcionário:', err);
    }
  }

  async function handleDelete(employee: EmployeeSummary) {
    const confirm = window.confirm(`Tem certeza que deseja remover ${employee.name}?`);
    if (!confirm) return;

    try {
      await deleteDepartmentEmployee(Number(params.id), employee.id);
      await refetch();
    } catch (err) {
      console.error('Erro ao deletar funcionário:', err);
    }
  }

  return (
    <div class="width-full h-full bg-white p-4">
      <div class="bg-white p-4">
        <div class="breadcrumbs text-sm">
          <ul>
            <li><a href='/'>Departamento Nome</a></li>
            <li>Funcionários</li>
          </ul>
        </div>

        <div class='flex items-center justify-between p-4'>
          <h1 class="font-bold text-4xl">Funcionários</h1>
          <label class="input">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input ref={el => (inputRef = el)} type="search" class="grow" placeholder="Search" />
            <kbd class="kbd kbd-sm">ctrl</kbd>
            <kbd class="kbd kbd-sm">F</kbd>
          </label>
          <button class="btn btn-outline btn-accent" onClick={() => {
            window.location.href = `/departamento/${params.id}/funcionario/criar`;
          }}>Inserir Funcionario</button>
        </div>

        <Show when={employees()} fallback={<p class="p-4">Carregando funcionários...</p>}>
          <For each={employees()?.data?.employees as EmployeeSummary[]}>
            {(employee) => (
              <ul class="list bg-base-100 rounded-box shadow-md mt-2">
                <li class="list-row flex items-center gap-4 px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-user-round-icon lucide-user-round">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21a8 8 0 0 0-16 0" />
                  </svg>
                  <div class="flex-1">
                    <div>{employee.name}</div>
                    <div class="text-xs uppercase font-semibold opacity-60">{employee.function_title}</div>
                  </div>
                  <div class="flex gap-1">
                    <button class="btn btn-square btn-ghost" onClick={() => handleView(employee)}>
                      <Eye style={{ color: '#0080ff' }} />
                    </button>
                    <button class="btn btn-square btn-ghost">
                      <Pencil style={{ color: '#DAA520' }} />
                    </button>
                    <button class="btn btn-square btn-ghost" onClick={() => handleDelete(employee)}>
                      <Trash2 style={{ color: 'red' }} />
                    </button>
                  </div>
                </li>
              </ul>
            )}
          </For>
        </Show>
      </div>

      {/* Modal de Funcionário */}
      <Show when={modalOpen()}>
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
            <button
              class="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
              onClick={() => setModalOpen(false)}
            >
              <X class="w-5 h-5" />
            </button>

            <h2 class="text-3xl font-bold mb-4 text-neutral-800">{selectedEmployee()?.name}</h2>

            <div class="space-y-2 text-neutral-700">
              <p><strong>Função:</strong> {selectedEmployee()?.function.title}</p>
              <p><strong>Email:</strong> {selectedEmployee()?.email}</p>
              <p><strong>Telefone:</strong> {selectedEmployee()?.phone}</p>
              <p><strong>Admissão:</strong> {selectedEmployee()?.hire_date}</p>
              <p><strong>Salário:</strong> R$ {selectedEmployee()?.function.salary}</p>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
