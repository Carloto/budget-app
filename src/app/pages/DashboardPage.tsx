import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExpensesTable, Filter, Header } from '../components';
import { CurrentMonth, months } from '../helpers';
import { Expense, getExpenses, getExpensesByMonth } from '../services';

function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [currMonth, setCurrMonth] = useState<CurrentMonth>();

  const navigate = useNavigate();
  const { date } = useParams();

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
        setExpenses(await getExpensesByMonth(date));
      }
    })();
  }, [date]);

  return (
    <Container maxWidth='lg'>
      <Header>
        {currMonth && (
          <Filter
            years={years}
            months={months}
            currMonth={currMonth}
            handleChange={navigate}
          />
        )}
        <Box component='span'>
          Despesa total:{' '}
          <strong>
            {expenses
              .reduce((acc, curr) => acc + curr.valor, 0)
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </strong>
        </Box>
      </Header>
      <ExpensesTable expenses={expenses} />
    </Container>
  );
}

export { DashboardPage };
