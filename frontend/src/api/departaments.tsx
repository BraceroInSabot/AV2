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

export async function viewDepartment(id: number) {
  try {
    const response = await axios.get(`${BASE_URL}/departamentos/${id}/`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar departamento:', error);
    throw error;
  }
}