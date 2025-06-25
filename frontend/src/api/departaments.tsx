import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

// Listar Departamentos

export async function getDepartments() {
  try {
    const response = await axios.get(`${BASE_URL}/departamentos/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar departamentos:', error);
    throw error;
  }
}

// Criar Departamento

interface Department {
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

export async function createDepartment(departmentData: Department) {
    try {
        const response = await axios.post(`${BASE_URL}/departamentos/criar/`, departmentData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar departamento:', error);
        throw error;
    }
}

// Consultar Departamento

export async function viewDepartment(id: number) {
  try {
    const response = await axios.get(`${BASE_URL}/departamentos/${id}/`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar departamento:', error);
    throw error;
  }
}

// Deletar Departamento

export async function deleteDepartment(id: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/departamentos/deletar/${id}/`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar departamento:', error);
    throw error;
  }
}

// Atualizar Departamento

export interface UpdateDepartment {
  name?: string;
  description?: string;
  phone?: string;
  manager?: string;
  address?: {
    street?: string;
    neighborhood?: string;
    number?: string;
    zip_code?: string;
    city?: string;
    country?: string;
  };
}

export async function updateDepartment(id: string | number, payload: UpdateDepartment) {
  try {
    const response = await axios.put(`${BASE_URL}/departamentos/alterar/${id}/`, {
      department_name: payload.name,
      department_description: payload.description,
      department_phone: payload.phone,
      department_manager: payload.manager,
      address: {
        address_street: payload.address?.street,
        address_city: payload.address?.city,
        address_state: payload.address?.country,
        address_zip_code: payload.address?.zip_code,
        address_country: payload.address?.country,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Erro ao atualizar departamento:', error.response?.data || error.message);
    throw error;
  }
}

// Listar Funcionários de um Departamento

export async function getDepartmentEmployees(id: number) {
  try {
    const response = await axios.get(`${BASE_URL}/departamentos/${id}/funcionarios/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar funcionários do departamento:', error);
    throw error;
  }
}

// Criar Funcionário em um Departamento

export async function createDepartmentEmployee(id: number, employeeData: any) {
  try {
    const response = await axios.post(`${BASE_URL}/departamentos/${id}/funcionarios/criar/`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar funcionário no departamento:', error);
    throw error;
  }
}

// Consultar Funcionário de um Departamento

export async function viewDepartmentEmployee(departmentId: number, employeeId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/departamentos/${departmentId}/funcionarios/${employeeId}/`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar funcionário do departamento:', error);
    throw error;
  }
}

// Deletar Funcionário de um Departamento

export async function deleteDepartmentEmployee(departmentId: number, employeeId: number) {
  try {
    const response = await axios.delete(`${BASE_URL}/departamentos/${departmentId}/funcionarios/deletar/${employeeId}/`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao deletar funcionário do departamento:', error);
    throw error;
  }
}