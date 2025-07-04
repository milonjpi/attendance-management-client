import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    padding: '3px',
    border: '1px solid #999999',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

const MonthlySalaryRow = ({ sn, data }) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        <span style={{ display: 'block', fontWeight: 700 }}>
          {data?.fullName}
        </span>
        <span style={{ display: 'block', fontSize: 8 }}>
          {data?.officeId + ', ' + data?.designation}
        </span>
      </StyledTableCell>
      <StyledTableCell>{data?.department}</StyledTableCell>
      <StyledTableCell>{data?.branch}</StyledTableCell>
      <StyledTableCell align="right">{data?.totalDay}</StyledTableCell>
      <StyledTableCell align="right">{data?.workingDay}</StyledTableCell>
      <StyledTableCell align="right">{data?.absent}</StyledTableCell>
      <StyledTableCell align="right">{data?.salary}</StyledTableCell>
      <StyledTableCell align="right">{data?.deduction}</StyledTableCell>
      <StyledTableCell align="right">{data?.earnSalary}</StyledTableCell>
    </StyledTableRow>
  );
};

export default MonthlySalaryRow;
