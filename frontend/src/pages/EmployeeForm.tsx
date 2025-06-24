import { createStore } from 'solid-js/store';
import { Eye, Trash2 } from 'lucide-solid';

export default function EmployeeForm() {
  const [form, setForm] = createStore({
    nome: "",
    image: "",
    email: "",
    telefone: "",
    inicioTurno: "",
    fimTurno: "",
    dataContratacao: "",
    dataAniversario: "",
  });

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setForm({ [name]: value });
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    console.log("Dados enviados:", form);
  }

  return (
    <div class="w-full min-h-screen bg-base-200 flex justify-center items-start p-6">
      <div class="bg-base-100 rounded-xl shadow-lg w-full max-w-4xl p-8">
        <div class="breadcrumbs text-sm">
          <ul>
            <li><a href='/'>Departamento Nome</a></li>
            <li><a href='/'>Funcionarios</a></li>
            <li>João da Silva</li>
          </ul>
        </div>
        <h1 class="text-3xl font-bold mb-6">Cadastro / Edição de Funcionários</h1>

        <form onSubmit={handleSubmit} class="flex flex-col gap-4">
          {/* Header com foto e nome */}
          <div class="flex gap-4 items-center">
            <img
              src={form.image || "https://external-preview.redd.it/he-literally-said-bruh-all-that-time-v0-bmxpeTdiY2FhYXpkMdJYX8DjN8ZpBWatLnq7gMPGfNXeT7VOSszpassJbNx_.png?format=pjpg&auto=webp&s=f603e93b8c934963e614fcf35c8c3fd854554c80"}
              alt="Funcionário"
              class="w-30 h-30 rounded-xl object-cover"
            />
            <div class="flex flex-1 flex-col gap-2">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text">Nome</span>
                </div>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onInput={handleChange}
                  placeholder="Digite o nome"
                  class="input input-bordered w-full"
                  required
                />
              </label>

              <input
                type="file"
                name="image"
                class="file-input file-input-bordered w-full"
                onChange={(e) =>
                  setForm({ image: URL.createObjectURL(e.target.files![0]) })
                }
              />
            </div>
          </div>

          {/* Email e Telefone */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="form-control">
              <div class="label">
                <span class="label-text">Email</span>
              </div><br />
              <input
                type="email"
                name="email"
                value={form.email}
                onInput={handleChange}
                placeholder="exemplo@empresa.com"
                class="input input-bordered"
                required
              />
            </label>

            <label class="form-control">
              <div class="label">
                <span class="label-text">Telefone</span>
              </div><br />
              <input
                type="tel"
                name="telefone"
                value={form.telefone}
                onInput={handleChange}
                placeholder="11999999999"
                pattern="\d{10,11}"
                class="input input-bordered"
              />
            </label>
          </div>

          {/* Turno */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="form-control">
              <div class="label">
                <span class="label-text">Início do Turno</span>
              </div>
              <input
                type="time"
                name="inicioTurno"
                value={form.inicioTurno}
                onInput={handleChange}
                class="input input-bordered"
                required
              />
            </label>

            <label class="form-control">
              <div class="label">
                <span class="label-text">Fim do Turno</span>
              </div>
              <input
                type="time"
                name="fimTurno"
                value={form.fimTurno}
                onInput={handleChange}
                class="input input-bordered"
                required
              />
            </label>
          </div>

          {/* Datas */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="form-control">
              <div class="label">
                <span class="label-text">Data de Contratação</span>
              </div>
              <input
                type="date"
                name="dataContratacao"
                value={form.dataContratacao}
                onInput={handleChange}
                class="input input-bordered"
                required
              />
            </label>

            <label class="form-control">
              <div class="label">
                <span class="label-text">Data de Aniversário</span>
              </div>
              <input
                type="date"
                name="dataAniversario"
                value={form.dataAniversario}
                onInput={handleChange}
                class="input input-bordered"
              />
            </label>
          </div>

          {/* Lista Exemplo */}
          <div class="overflow-x-auto">
            <h2 class='font-bold pl-4 text-2xl'>Função</h2>
            <table class="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Salario</th>
                  <th>Supervisionado por</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>Quality Control Specialist</td>
                  <td>R$ 49.99</td>
                  <td>Ana</td>
                </tr>
              </tbody>
            </table>
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

          {/* Botão de envio */}
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
