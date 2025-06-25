import { createStore } from 'solid-js/store';
import { useNavigate, useParams } from '@solidjs/router';
import { onMount } from 'solid-js';
import { viewDepartmentEmployee, updateDepartmentEmployee } from '../api/departaments';

export default function EmployeeEditForm() {
  const navigate = useNavigate();
  const params = useParams();

  const [form, setForm] = createStore({
    nome: '',
    email: '',
    telefone: '',
    nascimento: '',
    rua: '',
    bairro: '',
    numero: '',
    cidade: '',
    cep: '',
    uf: '',
    cargo: '',
    salario: '',
  });

  onMount(async () => {
  try {
    const data = await viewDepartmentEmployee(Number(params.id), Number(params.employeeId));
    setForm({
      nome: data.name,
      email: data.email,
      telefone: data.phone,
      nascimento: data.birth_date,
      rua: data.address?.street || '',
      bairro: data.address?.neighborhood || '',
      numero: data.address?.number || '',
      cidade: data.address?.city || '',
      cep: data.address?.zip_code || '',
      uf: data.address?.country || '',
      cargo: data.function?.title || '',
      salario: data.function?.salary || '',
    });

    console.log('Dados do funcionário carregados:', form.uf);
  } catch (error) {
    alert('Erro ao carregar dados do funcionário.');
  }
});

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setForm({ [name]: value });
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    const payload = {
      name: form.nome,
      email: form.email,
      phone: form.telefone,
      birth_date: form.nascimento,
      address: {
        street: form.rua,
        neighborhood: form.bairro,
        number: form.numero,
        city: form.cidade,
        zip_code: form.cep,
        country: form.uf,
      },
      function: {
        title: form.cargo,
        salary: form.salario,
      },
    };

    try {
      await updateDepartmentEmployee(Number(params.id), Number(params.employeeId), payload);
      alert('Funcionário atualizado com sucesso!');
      navigate(`/departamento/${params.id}/funcionarios`);
    } catch (error) {
      alert('Erro ao atualizar funcionário.');
    }
  }

  console.log(form);
  return (
    <div class="w-full min-h-screen bg-base-200 flex justify-center items-start p-6">
      <div class="bg-base-100 rounded-xl shadow-lg w-full max-w-4xl p-8">
        <div class="breadcrumbs text-sm mb-4">
          <ul>
            <li><a href="/">Departamentos</a></li>
            <li><a href={`/departamento/${params.id}/funcionarios/`}>Funcionários</a></li>
            <li>Editar Funcionário</li>
          </ul>
        </div>

        <h1 class="text-3xl font-bold mb-6">Editar Funcionário</h1>

        <form onSubmit={handleSubmit} class="flex flex-col gap-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="form-control">
              <div class="label">
                <span class="label-text">Nome</span>
              </div>
              <br />
              <input
                type="text"
                name="nome"
                value={form.nome}
                onInput={handleChange}
                class="input input-bordered"
                required
              />
            </label>

            <label class="form-control">
              <div class="label">
                <span class="label-text">Email</span>
              </div>
              <br />
              <input
                type="email"
                name="email"
                value={form.email}
                onInput={handleChange}
                class="input input-bordered"
                required
              />
            </label>

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
                class="input input-bordered"
                placeholder="(11) 99999-9999"
                required
              />
            </label>

            <label class="form-control">
              <div class="label">
                <span class="label-text">Data de Nascimento</span>
              </div>
              <br />
              <input
                type="date"
                name="nascimento"
                value={form.nascimento}
                onInput={handleChange}
                class="input input-bordered"
                required
              />
            </label>
          </div>

          <h2 class="font-bold text-2xl mt-6">Endereço</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="rua" value={form.rua} onInput={handleChange} placeholder="Rua" class="input input-bordered" required />
            <input type="text" name="bairro" value={form.bairro} onInput={handleChange} placeholder="Bairro" class="input input-bordered" required />
            <input type="text" name="numero" value={form.numero} onInput={handleChange} placeholder="Número" class="input input-bordered" required />
            <input type="text" name="cep" value={form.cep} onInput={handleChange} placeholder="CEP" class="input input-bordered" required />
            <input type="text" name="cidade" value={form.cidade} onInput={handleChange} placeholder="Cidade" class="input input-bordered" required />
            <input type="text" name="uf" value={form.uf} onInput={handleChange} placeholder="UF" class="input input-bordered" required />
          </div>

          <h2 class="font-bold text-2xl mt-6">Função</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="cargo" value={form.cargo} onInput={handleChange} placeholder="Cargo" class="input input-bordered" required />
            <input type="number" step="0.01" name="salario" value={form.salario} onInput={handleChange} placeholder="Salário" class="input input-bordered" required />
          </div>

          <div class="flex justify-end gap-2 mt-6">
            <button type="submit" class="btn btn-primary">Salvar</button>
            <a href={`/departamento/${params.id}/funcionarios`}><button type="button" class="btn btn-error">Cancelar</button></a>
          </div>
        </form>
      </div>
    </div>
  );
}
