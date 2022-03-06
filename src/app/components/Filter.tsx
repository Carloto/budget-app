import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { CurrentMonth } from '../helpers';

interface FilterProps {
  years: string[];
  months: string[];
  currMonth: CurrentMonth;
  handleChange: (newMonth: string) => void;
}

function Filter({ years, months, currMonth, handleChange }: FilterProps) {
  return (
    <Box sx={{ flex: 1, display: 'flex', gap: '10px' }}>
      <FormControl variant='standard' sx={{ width: 'max-content' }}>
        <InputLabel id='yearFilter'>Ano</InputLabel>
        <Select
          labelId='yearFilter'
          value={currMonth.year}
          onChange={(e) =>
            handleChange(`/${e.target.value}-${currMonth.month}`)
          }
          label='Ano'
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant='standard' sx={{ width: 'max-content' }}>
        <InputLabel id='monthFilter'>Mês</InputLabel>
        <Select
          labelId='monthFilter'
          value={parseInt(currMonth.month)}
          onChange={(e) =>
            handleChange(
              `/${currMonth.year}-${e.target.value.toString().padStart(2, '0')}`
            )
          }
          label='Mês'
        >
          {months.map((month, index) => (
            <MenuItem key={month} value={index + 1}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export { Filter };
