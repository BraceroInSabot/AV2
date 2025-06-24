import { createStore } from 'solid-js/store';
import { createDepartment } from '../api/departaments';
import { useNavigate } from '@solidjs/router';

interface CreateDepartment {
  name: string;
  description: string;
  phone: string;
  manager: string;
  address: {
    street: string;
    neighborhood: string;
    number: string;
    zip_code: string;
    city: string;
    country: string;
  };
}

export default function DepartmentForm() {
  const navigate = useNavigate();

  const [form, setForm] = createStore({
    nome: '',
    descricao: '',
    telefone: '',
    gerente: '',
    rua: '',
    bairro: '',
    numero: '',
    cep: '',
    cidade: '',
    uf: '',
  });

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setForm({ [name]: value });
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    const payload: CreateDepartment = {
      name: form.nome,
      description: form.descricao,
      phone: form.telefone,
      manager: form.gerente,
      address: {
        street: form.rua,
        neighborhood: form.bairro,
        number: form.numero,
        zip_code: form.cep,
        city: form.cidade,
        country: form.uf, // Pode ser 'SP' ou 'Brasil' conforme backend
      },
    };

    try {
      await createDepartment(payload);
      alert('Departamento criado com sucesso!');
      navigate('/departamentos');
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

          <div class="overflow-x-auto">
            <h2 class='font-bold pl-4 text-2xl'>Endereço</h2>
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
                      name="rua"
                      value={form.rua}
                      onInput={handleChange}
                      placeholder="Rua"
                      class="input input-bordered w-full"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="bairro"
                      value={form.bairro}
                      onInput={handleChange}
                      placeholder="Bairro"
                      class="input input-bordered w-full"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="numero"
                      value={form.numero}
                      onInput={handleChange}
                      placeholder="Número"
                      class="input input-bordered w-full"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="cep"
                      value={form.cep}
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
                      name="cidade"
                      value={form.cidade}
                      onInput={handleChange}
                      placeholder="Cidade"
                      class="input input-bordered w-full"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="uf"
                      value={form.uf}
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

          <div class="flex justify-end gap-2 mt-6">
            <button type="submit" class="btn btn-primary">Salvar</button>
            <a href="/departamentos">
              <button type="button" class="btn btn-error">Cancelar</button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
