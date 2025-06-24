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

interface CreateDepartment {
    department_name: string;
    department_description: string;
    department_phone: string;
    department_manager: string;
    address: {
        street: string;
        neighborhood: string;
        number: string;
        zip_code: string;
        city: string;
        country: string;
      },
}

export async function createDepartment(departmentData: CreateDepartment) {
    try {
        const response = await axios.post(`${BASE_URL}/departamentos/criar/`, departmentData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar departamento:', error);
        throw error;
    }
}