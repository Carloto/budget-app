import { Box, Container } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExpensesTable, Filter, Header } from '../components';
import { SummaryTable } from '../components/SummaryTable';
import { TabPanel } from '../components/TabPanel';
import { months } from '../helpers';
import { useBudget } from '../hooks/budgetHook';

function DashboardPage() {
  const { date } = useParams();
  const navigate = useNavigate();

  const { expenses, years, currMonth, summary } = useBudget(date);

  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
      <Box sx={{ width: '100%' }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='Despesas'
            centered
          >
            <Tab label='Resumo' {...tabProps(0)} />
            <Tab label='Detalhes' {...tabProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ExpensesTable expenses={expenses} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SummaryTable summary={summary} />
        </TabPanel>
      </Box>
    </Container>
  );
}

export { DashboardPage };

function tabProps(index: number) {
  return {
    id: `budget-tab-${index}`,
    'aria-controls': `budget-tabpanel-${index}`,
  };
}
