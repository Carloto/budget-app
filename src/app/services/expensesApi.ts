export interface Expense {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

const baseUrl = 'http://localhost:3001';

export async function getExpenses(): Promise<Expense[]> {
  const response = await fetch(`${baseUrl}/despesas?_sort=mes`);
  return response.json();
}

export async function getExpensesByMonth(month: string): Promise<Expense[]> {
  const response = await fetch(`${baseUrl}/despesas?mes=${month}&_sort=dia`);
  return response.json();
}
