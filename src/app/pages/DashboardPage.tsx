import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Filter, Header } from '../components';
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
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (date) {
        setExpenses(await getExpensesByMonth(date));
        setCurrMonth({
          year: date.slice(0, 4),
          month: date.slice(5),
        });
      }
    })();
  }, [date]);

  console.log(expenses);

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
      </Header>
      dashboard page
    </Container>
  );
}

export { DashboardPage };
