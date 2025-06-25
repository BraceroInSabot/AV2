import { createResource, createSignal, For, Show } from 'solid-js';
import axios from 'axios';
import { Eye, Trash2, Pencil, Plus, X, Users } from 'lucide-solid';
import { viewDepartment, deleteDepartment } from '../api/departaments';

const fetchDepartments = async () => {
  const response = await axios.get('http://127.0.0.1:8000/departamentos/');
  return response.data.data.departments;
};

export default function Departments() {
  const [departments, { refetch }] = createResource(fetchDepartments);
  const [modalOpen, setModalOpen] = createSignal(false);
  const [selectedDepartment, setSelectedDepartment] = createSignal<any>(null);
  const [loadingModal, setLoadingModal] = createSignal(false);

  async function handleView(id: number) {
    try {
      setLoadingModal(true);
      const data = await viewDepartment(id);
      setSelectedDepartment(data);
      setModalOpen(true);
    } catch (error) {
      alert('Erro ao buscar dados do departamento.');
    } finally {
      setLoadingModal(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este departamento?');
    if (!confirmDelete) return;

    try {
      await deleteDepartment(id);
      alert('Departamento deletado com sucesso.');
      refetch();
    } catch (error) {
      alert('Erro ao deletar departamento.');
    }
  }

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
                  <div class='flex gap-1'>
                    <button class="btn btn-primary" onClick={() => handleView(dep.id)}>
                      <Eye class="w-4" />
                    </button>
                    <button class="btn btn-neutral" onClick={() => {
                      window.location.href = `/departamento/${dep.id}/funcionarios`;
                    }}>
                      <Users class="w-4" />
                    </button>
                  </div>
                  <div class='flex gap-1'>
                    <button class="btn btn-secondary" onClick={() => {
                      window.location.href = `/departamento/${dep.id}/alterar`;
                    }}>
                      <Pencil class="w-4" />
                    </button>
                    <button class="btn btn-error text-white" onClick={() => handleDelete(dep.id)}>
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

      {/* Modal */}
      <Show when={modalOpen()}>
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl relative">
            <button
              class="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
              onClick={() => setModalOpen(false)}
            >
              <X class="w-5 h-5" />
            </button>

            <Show when={!loadingModal()} fallback={<p class="text-center">Carregando dados...</p>}>
              <h2 class="text-3xl font-bold mb-4 text-neutral-800">{selectedDepartment().name}</h2>

              <div class="space-y-2">
                <p><span class="font-semibold text-neutral-600">Descrição:</span> {selectedDepartment().description}</p>
                <p><span class="font-semibold text-neutral-600">Telefone:</span> {selectedDepartment().phone}</p>
                <p><span class="font-semibold text-neutral-600">Gerente:</span> {selectedDepartment().manager}</p>
                <p><span class="font-semibold text-neutral-600">Criado em:</span> {selectedDepartment().created_at}</p>
              </div>

              <div class="mt-6">
                <h3 class="font-bold text-xl mb-3 text-neutral-700">Endereço</h3>
                <div class="grid grid-cols-2 gap-3">
                  <p><span class="font-semibold">Rua:</span> {selectedDepartment().address.street}</p>
                  <p><span class="font-semibold">Bairro:</span> {selectedDepartment().address.neighborhood}</p>
                  <p><span class="font-semibold">Número:</span> {selectedDepartment().address.number}</p>
                  <p><span class="font-semibold">Cidade:</span> {selectedDepartment().address.city}</p>
                  <p><span class="font-semibold">CEP:</span> {selectedDepartment().address.zip_code}</p>
                  <p><span class="font-semibold">UF:</span> {selectedDepartment().address.country}</p>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </div>
  );
}
