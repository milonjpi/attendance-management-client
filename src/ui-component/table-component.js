import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EmptyIcon from 'assets/svg/EmptyIcon';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ede7f6',
    color: '#5e35b1',
    padding: '6px',
    fontSize: 11,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    padding: '6px',
  },
}));

export const StyledTableCellWithBorder = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ede7f6',
    color: '#5e35b1',
    padding: '6px',
    fontSize: 11,
    border: '1px solid #686868',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    padding: '8px 6px',
    border: '1px solid #686868',
  },
}));
export const StyledTableCellWithNoBorder = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ede7f6',
    color: '#5e35b1',
    padding: '6px',
    fontSize: 10,
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    padding: '6px',
    border: 0,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const Empty = ({ width, height }) => {
  return (
    <Box sx={{ py: 2 }}>
      <Box>
        <EmptyIcon width={width} height={height} />
      </Box>
      <Typography sx={{ textAlign: 'center' }}>No Data</Typography>
    </Box>
  );
};
