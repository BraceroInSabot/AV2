import { createStore } from 'solid-js/store';
import { createDepartment } from '../api/departaments'; // ajuste conforme seu path
import { useNavigate } from '@solidjs/router';

export default function DepartmentForm() {
  const navigate = useNavigate();

  const [form, setForm] = createStore({
    nome: '',
    descricao: '',
    telefone: '',
    gerente: '',
  });

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setForm({ [name]: value });
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    const payload = {
      department_name: form.nome,
      department_description: form.descricao,
      department_phone: form.telefone,
      department_manager: form.gerente,
    };

    try {
      await createDepartment(payload);
      alert('Departamento criado com sucesso!');
      navigate('/');
    } catch (error) {
      alert('Erro ao criar departamento. Verifique os dados e tente novamente.');
    }
  }

  return (
    <div class="w-full min-h-screen bg-base-200 flex justify-center items-start p-6">
      <div class="bg-base-100 rounded-xl shadow-lg w-full max-w-4xl p-8">
        <div class="breadcrumbs text-sm mb-4">
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/departamentos">Departamentos</a></li>
            <li>Criar Departamento</li>
          </ul>
        </div>

        <h1 class="text-3xl font-bold mb-6">Cadastro de Departamento</h1>

        <form onSubmit={handleSubmit} class="flex flex-col gap-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="form-control">
              <div class="label">
                <span class="label-text">Nome</span>
              </div>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onInput={handleChange}
                placeholder="Digite o nome do departamento"
                class="input input-bordered w-full"
                required
              />
            </label>

            <label class="form-control">
              <div class="label">
                <span class="label-text">Telefone</span>
              </div>
              <input
                type="tel"
                name="telefone"
                value={form.telefone}
                onInput={handleChange}
                placeholder="11999999999"
                pattern="\d{10,11}"
                class="input input-bordered w-full"
                required
              />
            </label>
          </div>

          <label class="form-control">
            <div class="label">
              <span class="label-text">Descrição</span>
            </div>
            <textarea
              name="descricao"
              value={form.descricao}
              onInput={handleChange}
              placeholder="Descreva o departamento"
              class="textarea textarea-bordered w-full"
              rows={3}
              required
            />
          </label>

          <label class="form-control">
            <div class="label">
              <span class="label-text">Gerente Responsável</span>
            </div>
            <input
              type="text"
              name="gerente"
              value={form.gerente}
              onInput={handleChange}
              placeholder="Nome do gerente"
              class="input input-bordered w-full"
              required
            />
          </label>

          <div class="flex justify-end gap-2">
            <button type="submit" class="btn btn-primary">
              Salvar
            </button>
            <a href="/departamentos">
              <button type="button" class="btn btn-error">
                Cancelar
              </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
