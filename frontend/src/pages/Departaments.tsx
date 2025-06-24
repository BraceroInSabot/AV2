import { createResource, For } from 'solid-js';
import axios from 'axios';
import { Eye, Trash2, Pencil, Plus } from 'lucide-solid';

const fetchDepartments = async () => {
  const response = await axios.get('http://127.0.0.1:8000/departamentos/');
  return response.data.data.departments; // ajuste conforme o retorno da sua API
};

export default function Departments() {
  const [departments] = createResource(fetchDepartments);

  return (
    <div class="w-full relative min-h-screen">
      <div class="bg-white p-4">
        <h1 class="font-bold pl-4 text-4xl">Departamentos</h1>

        <div class="bg-white-100 p-4 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <For each={departments()}>
            {(dep) => (
              <div class="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow">
                <h2 class="text-xl font-bold">{dep.name}</h2>
                <p class="h-15 font-extralight mb-4">{dep.description}</p>
                <div class='flex items-center justify-between'>
                  <button class="btn btn-primary">
                    <Eye class="w-4" />
                  </button>
                  <div class='flex gap-1'>
                    <button class="btn btn-secondary">
                      <Pencil class="w-4" />
                    </button>
                    <button class="btn btn-error text-white">
                      <Trash2 class="w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </For>
          {departments.loading && <p>Carregando departamentos...</p>}
          {departments.error && <p>Erro ao carregar departamentos.</p>}
        </div>
      </div>

      {/* Botão Flutuante */}
      <a 
        href="/departamento/criar" 
        class="btn btn-secondary fixed bottom-6 right-6 shadow-lg hover:shadow-xl"
        aria-label="Criar departamento"
      >
        <Plus class="w-6 h-6" />
      </a>
    </div>
  );
}
