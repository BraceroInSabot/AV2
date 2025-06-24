import { createStore } from 'solid-js/store';

export default function DepartmentForm() {
  const [form, setForm] = createStore({
    nome: '',
    descricao: '',
    telefone: '',
    setor: '',
    endereco: '',
    gerente: '',
  });

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setForm({ [name]: value });
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    console.log('Dados enviados:', form);
  }

  return (
    <div class="w-full min-h-screen bg-base-200 flex justify-center items-start p-6">
      <div class="bg-base-100 rounded-xl shadow-lg w-full max-w-4xl p-8">
        {/* Breadcrumb */}
        <div class="breadcrumbs text-sm mb-4">
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/departamentos">Departamentos</a></li>
            <li>Criar Departamento</li>
          </ul>
        </div>

        {/* Título */}
        <h1 class="text-3xl font-bold mb-6">Cadastro / Edição de Departamento</h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} class="flex flex-col gap-4">
          {/* Nome e Setor */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="form-control gap-2">
              <div class="label">
                <span class="label-text">Nome</span>
              </div>
              <br />
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
                <span class="label-text">Setor</span>
              </div>
              <br />
              <input
                type="text"
                name="setor"
                value={form.setor}
                onInput={handleChange}
                placeholder="Digite o setor"
                class="input input-bordered w-full"
              />
            </label>
          </div>

          {/* Descrição */}
          <label class="form-control">
            <div class="label">
              <span class="label-text">Descrição</span>
            </div>
            <br />
            <textarea
              name="descricao"
              value={form.descricao}
              onInput={handleChange}
              placeholder="Descreva o departamento"
              class="textarea textarea-bordered w-full"
              rows={3}
            />
          </label>

          {/* Telefone e Endereço */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="form-control">
              <div class="label">
                <span class="label-text">Telefone</span>
              </div>
              <br />
              <input
                type="tel"
                name="telefone"
                value={form.telefone}
                onInput={handleChange}
                placeholder="11999999999"
                pattern="\d{10,11}"
                class="input input-bordered w-full"
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
            />
          </label>
          </div>

            <div class="overflow-x-auto">
            <h2 class='font-bold pl-4 text-2xl'>Endereço</h2>
            <table class="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Rua</th>
                  <th>Bairro</th>
                  <th>Numero</th>
                  <th>CEP</th>
                  <th>Cidade</th>
                  <th>UF</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>Rua Itapura</td>
                  <td>Jardim São Jorge</td>
                  <td>1746</td>
                  <td>03312-000</td>
                  <td>Jales</td>
                  <td>SP</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Botão */}
          <div class="flex justify-end gap-2">
            <button type="submit" class="btn btn-primary">
              Salvar
            </button>
            <a href="/">
              <button type="submit" class="btn btn-error">
                Cancelar
              </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
