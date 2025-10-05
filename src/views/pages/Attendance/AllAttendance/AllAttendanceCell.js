import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import moment from 'moment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    padding: '3px',
    border: '1px solid #999999',
  },
}));

const AllAttendanceCell = ({ sn, data, startDate }) => {
  const getMonth = new Date(moment(startDate)).getMonth();
  const getYear = new Date(moment(startDate)).getFullYear();
  const currentDate = new Date(getYear, getMonth, sn);
  const holiday = [5].includes(currentDate.getDay());

  return (
    <StyledTableCell align="center">
      <Typography sx={{ fontSize: 9, fontWeight: 700 }}>
        {moment(currentDate).format('D/M/YY')}
      </Typography>
      {data ? (
        data?.realPunch ? (
          <>
            <Typography sx={{ fontSize: 9 }}>
              In:{' '}
              {data?.inTime ? moment(data?.inTime).format('hh:mma') : 'Missing'}
            </Typography>
            <Typography sx={{ fontSize: 9 }}>
              out:{' '}
              {data?.outTime
                ? moment(data?.outTime).format('hh:mma')
                : parseInt(moment(currentDate).format('YYYYMMDD')) >=
                  parseInt(moment().format('YYYYMMDD'))
                ? 'Pending'
                : 'Missing'}
            </Typography>
          </>
        ) : (
          <>
            <Typography sx={{ fontSize: 9 }}>
              In: {moment(data?.inTime).format('hh:mma')}
            </Typography>
            <Typography sx={{ fontSize: 9 }}>&#40;Manual&#41;</Typography>
          </>
        )
      ) : parseInt(moment(currentDate).format('YYYYMMDD')) >=
        parseInt(moment().format('YYYYMMDD')) ? (
        <Typography sx={{ fontSize: 9 }}>Upcoming</Typography>
      ) : holiday ? (
        <Typography sx={{ fontSize: 9, color: '#4fa353' }}>Weekend</Typography>
      ) : (
        <Typography sx={{ fontSize: 9, color: '#b24b4b' }}>Absence</Typography>
      )}
    </StyledTableCell>
  );
};
export default AllAttendanceCell;
