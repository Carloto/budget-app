import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Expense } from '../services';

interface ExpensesTableProps {
  expenses: Expense[];
}

function ExpensesTable({ expenses = [] }: ExpensesTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Despesa</TableCell>
            <TableCell align='center'>Categoria</TableCell>
            <TableCell align='center'>Dia</TableCell>
            <TableCell align='right'>Valor(R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow
              key={expense.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {expense.descricao}
              </TableCell>
              <TableCell align='center'>{expense.categoria}</TableCell>
              <TableCell align='center'>{expense.dia}</TableCell>
              <TableCell align='right'>
                {expense.valor.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { ExpensesTable };
