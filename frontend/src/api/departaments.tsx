import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

export default async function getDepartments() {
  try {
    const response = await axios.get(`${BASE_URL}/departamentos/`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar departamentos:', error);
    throw error;
  }
}