import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { CategorySummary } from '../hooks/budgetHook';

interface SummaryTableProps {
  summary: CategorySummary[];
}

function SummaryTable({ summary = [] }: SummaryTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Categoria</TableCell>
            <TableCell align='right'>Valor(R$)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summary.map((item) => (
            <TableRow
              key={item.categoria}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {item.categoria}
              </TableCell>
              <TableCell align='right'>
                {item.valor.toLocaleString('pt-BR', {
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

export { SummaryTable };
