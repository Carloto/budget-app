import { useEffect, useState } from 'react';
import { CurrentMonth } from '../helpers';
import { Expense, getExpenses, getExpensesByMonth } from '../services';

export interface CategorySummary {
  categoria: string;
  valor: number;
}

export function useBudget(date: string | undefined) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<CategorySummary[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [currMonth, setCurrMonth] = useState<CurrentMonth>();

  useEffect(() => {
    (async function () {
      const expenses = await getExpenses();

      setYears(
        Array.from(new Set(expenses.map((expense) => expense.mes.slice(0, 4))))
      );

      if (date) {
        setCurrMonth({
          year: date.slice(0, 4),
          month: date.slice(5),
        });

        const monthExpenses = await getExpensesByMonth(date);
        setExpenses(monthExpenses);

        const categories = Array.from(
          new Set(monthExpenses.map((expense) => expense.categoria))
        );

        const summary: CategorySummary[] = [];
        for (const category of categories) {
          summary.push({
            categoria: category,
            valor: monthExpenses
              .filter((expense) => expense.categoria === category)
              .reduce((acc, curr) => acc + curr.valor, 0),
          });
        }
        setSummary(summary.sort((a, b) => b.valor - a.valor));
      }
    })();
  }, [date]);

  return { expenses, years, currMonth, summary };
}
