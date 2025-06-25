import { createStore } from 'solid-js/store';
import { useParams, useNavigate } from '@solidjs/router';
import { createDepartmentEmployee } from '../api/departaments';

export default function EmployeeForm() {
  const params = useParams();
  const navigate = useNavigate();
  const departmentId = Number(params.id);

  const [form, setForm] = createStore({
    name: '',
    email: '',
    phone: '',
    birth_date: '',
    address: {
      street: '',
      neighborhood: '',
      number: '',
      city: '',
      zip_code: '',
      country: '',
    },
    function: {
      title: '',
      salary: '',
    },
  });

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setForm('address', field, value);
    } else if (name.startsWith('function.')) {
      const field = name.split('.')[1];
      setForm('function', field, value);
    } else {
      setForm(name as keyof typeof form, value);
    }
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    try {
      if (!departmentId || isNaN(departmentId)) {
        console.error('ID do departamento inválido:', departmentId);  
        throw new Error('ID do departamento inválido');
      }

      await createDepartmentEmployee(departmentId, form);
      alert('Funcionário criado com sucesso.');
      navigate(`/departamento/${departmentId}/funcionarios`);
    } catch (err) {
      console.error('Erro ao enviar funcionário:', err);
      alert('Erro ao criar funcionário. Verifique os dados e tente novamente.');
    }
  }

  return (
    <div class="w-full min-h-screen bg-base-200 flex justify-center items-start p-6">
      <div class="bg-base-100 rounded-xl shadow-lg w-full max-w-4xl p-8">
        <h1 class="text-3xl font-bold mb-6 pl-8">Cadastro de Funcionário</h1>

        <form onSubmit={handleSubmit} class="flex flex-col w-full gap-4">
          <div class="grid grid-cols-1 md:grid-cols-2 pr-8 pl-8 gap-4">
            <label class="form-control">
              <span class="label-text">Nome</span>
              <br />
              <input
                type="text"
                name="name"
                value={form.name}
                onInput={handleChange}
                placeholder="Digite o nome"
                class="input input-bordered w-full"
                required
              />
            </label>

            <label class="form-control">
              <span class="label-text">Email</span>
              <br />
              <input
                type="email"
                name="email"
                value={form.email}
                onInput={handleChange}
                placeholder="exemplo@empresa.com"
                class="input input-bordered w-full"
                required
              />
            </label>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 pr-8 pl-8 gap-4">
            <label class="form-control">
              <span class="label-text">Telefone</span>
              <br />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onInput={handleChange}
                placeholder="(11) 99999-9999"
                class="input input-bordered w-full"
                required
              />
            </label>

            <label class="form-control">
              <span class="label-text">Data de Nascimento</span>
              <input
                type="date"
                name="birth_date"
                value={form.birth_date}
                onInput={handleChange}
                class="input input-bordered w-full"
                required
              />
            </label>
          </div>

          <div class="overflow-x-auto pl-4 pr-4">
            <h2 class="font-bold pl-4 pr-10 text-2xl">Endereço</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>Rua</th>
                  <th>Bairro</th>
                  <th>Número</th>
                  <th>CEP</th>
                  <th>Cidade</th>
                  <th>UF</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="address.street"
                      value={form.address.street}
                      onInput={handleChange}
                      placeholder="Rua"
                      class="input input-bordered w-full"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address.neighborhood"
                      value={form.address.neighborhood}
                      onInput={handleChange}
                      placeholder="Bairro"
                      class="input input-bordered w-full"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address.number"
                      value={form.address.number}
                      onInput={handleChange}
                      placeholder="Número"
                      class="input input-bordered w-full"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address.zip_code"
                      value={form.address.zip_code}
                      onInput={handleChange}
                      placeholder="00000-000"
                      pattern="\d{5}-?\d{3}"
                      class="input input-bordered w-full"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address.city"
                      value={form.address.city}
                      onInput={handleChange}
                      placeholder="Cidade"
                      class="input input-bordered w-full"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address.uf"
                      value={form.address.country}
                      onInput={handleChange}
                      placeholder="UF"
                      maxLength={2}
                      class="input input-bordered w-full"
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 class="font-bold pl-8 text-2xl">Função</h2>
          <div class="flex flex-col pl-8 pr-8 md:flex-row gap-4">
            <div class="flex-1">
              <label class="form-control w-full">
                <span class="label-text">Título</span>
                <input
                  type="text"
                  name="function.title"
                  value={form.function.title}
                  onInput={handleChange}
                  class="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div class="flex-1">
              <label class="form-control w-full">
                <span class="label-text">Salário</span>
                <input
                  type="number"
                  step="0.01"
                  name="function.salary"
                  value={form.function.salary}
                  onInput={handleChange}
                  class="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>

          <div class="flex justify-end mt-6 gap-2">
            <button type="submit" class="btn btn-primary">Salvar</button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              class="btn btn-error"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
