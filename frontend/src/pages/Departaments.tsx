import { For } from 'solid-js';
import { Eye, Trash2, Pencil, Plus } from 'lucide-solid';

const departments = [
  { id: 1, nome: 'Recursos Humanos', descricao: 'Gestão de pessoas e desenvolvimento organizacional.' },
  { id: 2, nome: 'Financeiro', descricao: 'Gestão financeira, contabilidade e pagamentos.' },
  { id: 3, nome: 'TI', descricao: 'Infraestrutura, suporte e desenvolvimento de sistemas.' },
  { id: 4, nome: 'Logística', descricao: 'Controle de estoque, transporte e distribuição.' },
  { id: 5, nome: 'Marketing', descricao: 'Gestão de marca, publicidade e campanhas.' },
];

export default function Departments() {
  return (
    <div class="w-full relative min-h-screen">
      <div class="bg-white p-4">
        <h1 class="font-bold pl-4 text-4xl">Departamentos</h1>
        
        <div class="bg-white-100 p-4 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <For each={departments}>
            {(dep) => (
              <div class="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow">
                <h2 class="text-xl font-bold">{dep.nome}</h2>
                <p class="h-15 font-extralight mb-4">{dep.descricao}</p>
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
