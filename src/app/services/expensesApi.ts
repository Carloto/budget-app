import { baseUrl } from '.';

export interface Expense {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export async function getExpenses(): Promise<Expense[]> {
  const response = await fetch(`${baseUrl}/despesas?_sort=mes`, {
    credentials: 'include',
  });
  return response.json();
}

export async function getExpensesByMonth(month: string): Promise<Expense[]> {
  const response = await fetch(`${baseUrl}/despesas?mes=${month}&_sort=dia`, {
    credentials: 'include',
  });
  return response.json();
}
