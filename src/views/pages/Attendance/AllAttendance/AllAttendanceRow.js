import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { daysOfMonth } from 'constants/globals';
import AllAttendanceCell from './AllAttendanceCell';
import moment from 'moment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
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

const AllAttendanceRow = ({ sn, data, fromDate, toDate }) => {
  const startDate = fromDate ? new Date(moment(fromDate)).getDate() - 1 : 0;
  const endDate = toDate ? new Date(moment(toDate)).getDate() : 0;
  const filterDate = daysOfMonth.slice(startDate, endDate);

  const firstRow = filterDate.slice(0, 16);
  const secondRow = filterDate.slice(16, 31);
  const allAttendances = data?.attendances || [];

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        <Typography sx={{ fontSize: 11, fontWeight: 700 }}>
          {data?.name}
        </Typography>
        <Typography sx={{ fontSize: 10 }}>
          {data?.designation?.label + ', ' + data?.department?.label}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        <Table>
          <TableBody>
            <StyledTableRow>
              {firstRow.map((el) => (
                <AllAttendanceCell
                  key={el}
                  sn={el}
                  startDate={fromDate}
                  data={allAttendances.find(
                    (d) => new Date(moment(d.inTime).utc()).getDate() === el
                  )}
                />
              ))}
            </StyledTableRow>
            {secondRow.length ? (
              <StyledTableRow>
                {secondRow.map((el) => (
                  <AllAttendanceCell
                    key={el}
                    sn={el}
                    startDate={fromDate}
                    data={allAttendances.find(
                      (d) => new Date(moment(d.inTime).utc()).getDate() === el
                    )}
                  />
                ))}
              </StyledTableRow>
            ) : null}
          </TableBody>
        </Table>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default AllAttendanceRow;
