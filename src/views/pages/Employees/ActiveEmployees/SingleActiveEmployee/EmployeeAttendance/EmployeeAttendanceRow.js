import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 9,
    padding: '6px',
    border: '1px solid #999999',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

const EmployeeAttendanceRow = ({ sn, data }) => {
  return (
    <StyledTableRow className="row">
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>{data?.remarks || 'n/a'}</StyledTableCell>
      <StyledTableCell align="center">
        {data?.inTime ? (
          moment(data?.inTime).format('hh:mm a')
        ) : (
          <span style={{ color: 'red' }}>Missing</span>
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        {data?.outTime ? (
          moment(data?.outTime).format('hh:mm a')
        ) : (
          <span style={{ color: 'red' }}>Missing</span>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default EmployeeAttendanceRow;
