import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
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

const DailyAttendanceRow = ({ sn, data, date }) => {
  const currentDate = new Date(moment(date));
  const holiday = [5].includes(currentDate.getDay());

  const attendances = data?.attendances[0] || null;

  const findLeave = data?.leaves?.find(
    (el) =>
      Number(moment(currentDate).format('YYYYMMDD')) >=
        Number(moment(el.fromDate).format('YYYYMMDD')) &&
      Number(moment(currentDate).format('YYYYMMDD')) <=
        Number(moment(el.toDate).format('YYYYMMDD'))
  );

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{moment(date).format('DD/MM/YYYY')}</StyledTableCell>
      <StyledTableCell>{data?.name}</StyledTableCell>
      <StyledTableCell>{data?.designation?.label}</StyledTableCell>
      <StyledTableCell>{data?.department?.label}</StyledTableCell>
      <StyledTableCell>
        {data?.location?.label + ', ' + data?.location?.area?.label}
      </StyledTableCell>
      {attendances ? (
        attendances.realPunch ? (
          <>
            <StyledTableCell>
              {attendances.inTime
                ? moment(attendances.inTime).utc().format('hh:mm A')
                : 'Missing'}
            </StyledTableCell>
            <StyledTableCell>
              {attendances.outTime
                ? moment(attendances.outTime).utc().format('hh:mm A')
                : parseInt(moment(date).format('YYYYMMDD')) >=
                  parseInt(moment().format('YYYYMMDD'))
                ? 'Pending'
                : 'Missing'}
            </StyledTableCell>
          </>
        ) : (
          <StyledTableCell colSpan={2}>
            {moment(attendances.inTime).utc().format('hh:mm A') + ' (Manual)'}
          </StyledTableCell>
        )
      ) : parseInt(moment(date).format('YYYYMMDD')) >=
        parseInt(moment().format('YYYYMMDD')) ? (
        <StyledTableCell colSpan={2} align="center" sx={{ fontSize: 9 }}>
          Upcoming
        </StyledTableCell>
      ) : holiday ? (
        <StyledTableCell
          colSpan={2}
          align="center"
          sx={{ fontSize: 9, color: '#4fa353' }}
        >
          Weekend
        </StyledTableCell>
      ) : (
        <StyledTableCell colSpan={2} align="center">
          {findLeave ? (
            <span style={{ color: 'green' }}>Leave</span>
          ) : (
            <span style={{ color: 'red' }}>Absent</span>
          )}
        </StyledTableCell>
      )}
    </StyledTableRow>
  );
};

export default DailyAttendanceRow;
