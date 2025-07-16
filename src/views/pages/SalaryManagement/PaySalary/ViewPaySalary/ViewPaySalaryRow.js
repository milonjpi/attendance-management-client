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

const ViewPaySalaryRow = ({ sn, data }) => {
  const employee = data?.employee;
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        <span style={{ display: 'block', fontWeight: 700 }}>
          {employee?.name}
        </span>
        <span style={{ display: 'block', fontSize: 8 }}>
          {employee?.officeId + ', ' + employee?.designation?.label}
        </span>
      </StyledTableCell>
      <StyledTableCell>{employee?.department?.label}</StyledTableCell>
      <StyledTableCell align="right">{data?.totalDays}</StyledTableCell>
      <StyledTableCell align="right">{data?.weekends}</StyledTableCell>
      <StyledTableCell align="right">
        {data?.presents - data?.leaves}
      </StyledTableCell>
      <StyledTableCell align="right">{data?.absents}</StyledTableCell>
      <StyledTableCell align="right">{data?.leaves}</StyledTableCell>
      <StyledTableCell align="right">{data?.lateCounts}</StyledTableCell>
      <StyledTableCell align="right">{data?.salary}</StyledTableCell>
      <StyledTableCell align="right">{data?.deduction}</StyledTableCell>
      <StyledTableCell align="right">{data?.earnSalary}</StyledTableCell>
    </StyledTableRow>
  );
};

export default ViewPaySalaryRow;
