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

const AllAttendanceRow = ({ sn, data, firstSlot, secondSlot }) => {
  const attendanceDetails = data?.attendances || [];
  const rowSpan = firstSlot?.length && secondSlot?.length ? 2 : 1;

  const weekend = data?.location?.weekend || 'Friday';

  return (
    <>
      {/* Main Row */}
      <StyledTableRow className="row">
        <StyledTableCell align="center" rowSpan={rowSpan}>
          {sn}
        </StyledTableCell>
        <StyledTableCell rowSpan={rowSpan}>
          <span style={{ display: 'block', fontWeight: 700 }}>
            {data?.name}
          </span>
          <span style={{ display: 'block' }}>
            {data?.officeId +
              (data?.designation?.label ? ', ' + data?.designation?.label : '')}
          </span>
        </StyledTableCell>

        {/* First row includes totals and actions */}
        {firstSlot.length > 0 &&
          firstSlot?.map((el) => {
            const findAttn = attendanceDetails?.find(
              (bl) => el === moment(bl.date).utc(0).format('DD/MM/YYYY')
            );

            const splitDate = el.split('/');
            const mainDate = new Date(
              `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
            );
            const findLeave = data?.leaves?.find(
              (el) =>
                Number(moment(mainDate).format('YYYYMMDD')) >=
                  Number(moment(el.fromDate).format('YYYYMMDD')) &&
                Number(moment(mainDate).format('YYYYMMDD')) <=
                  Number(moment(el.toDate).format('YYYYMMDD'))
            );
            return (
              <StyledTableCell key={el}>
                <span
                  style={{
                    display: 'block',
                    fontWeight: 700,
                  }}
                >
                  {el}
                </span>
                {findAttn ? (
                  <>
                    <span
                      style={{
                        display: 'inline-block',
                        color: '#564dc0',
                        fontWeight: 700,
                        fontSize: 7,
                      }}
                    >{`IN: ${
                      findAttn?.inTime
                        ? moment(findAttn?.inTime).utc(0).format('hh:mm a')
                        : 'no'
                    }`}</span>
                    <br />
                    <span
                      style={{
                        display: 'inline-block',
                        color: '#564dc0',
                        fontWeight: 700,
                        fontSize: 7,
                      }}
                    >{`O: ${
                      findAttn?.outTime
                        ? moment(findAttn?.outTime).utc(0).format('hh:mm a')
                        : 'no'
                    }`}</span>
                  </>
                ) : (
                  <span style={{ display: 'block' }}>
                    {moment(mainDate).format('dddd') === weekend ? (
                      moment(mainDate).format('dddd')
                    ) : mainDate?.getTime() > new Date().getTime() ? (
                      'Upcoming'
                    ) : findLeave ? (
                      <span style={{ color: 'green' }}>Leave</span>
                    ) : (
                      <span style={{ color: 'red' }}>Absent</span>
                    )}
                  </span>
                )}
              </StyledTableCell>
            );
          })}
      </StyledTableRow>
      {secondSlot?.length ? (
        <StyledTableRow className="row">
          {secondSlot?.map((el) => {
            const findAttn = attendanceDetails?.find(
              (bl) => el === `${moment(bl.date).utc(0).format('DD/MM/YYYY')}`
            );
            const splitDate = el.split('/');
            const mainDate = new Date(
              `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
            );
            const findLeave = data?.leaves?.find(
              (el) =>
                Number(moment(mainDate).format('YYYYMMDD')) >=
                  Number(moment(el.fromDate).format('YYYYMMDD')) &&
                Number(moment(mainDate).format('YYYYMMDD')) <=
                  Number(moment(el.toDate).format('YYYYMMDD'))
            );

            return (
              <StyledTableCell key={el}>
                <span
                  style={{
                    display: 'block',
                    fontWeight: 700,
                  }}
                >
                  {el}
                </span>
                {findAttn ? (
                  <>
                    <span
                      style={{
                        display: 'inline-block',
                        color: '#564dc0',
                        fontWeight: 700,
                        fontSize: 7,
                      }}
                    >{`IN: ${
                      findAttn?.inTime
                        ? moment(findAttn?.inTime).utc(0).format('hh:mm a')
                        : 'no'
                    }`}</span>
                    <br />
                    <span
                      style={{
                        display: 'inline-block',
                        color: '#564dc0',
                        fontWeight: 700,
                        fontSize: 7,
                      }}
                    >{`O: ${
                      findAttn?.outTime
                        ? moment(findAttn?.outTime).utc(0).format('hh:mm a')
                        : mainDate?.getDate() < new Date().getDate()
                        ? 'Missing'
                        : 'Pending'
                    }`}</span>
                  </>
                ) : (
                  <span style={{ display: 'block' }}>
                    {moment(mainDate).format('dddd') === weekend ? (
                      moment(mainDate).format('dddd')
                    ) : mainDate?.getTime() > new Date().getTime() ? (
                      'Upcoming'
                    ) : findLeave ? (
                      <span style={{ color: 'green' }}>Leave</span>
                    ) : (
                      <span style={{ color: 'red' }}>Absent</span>
                    )}
                  </span>
                )}
              </StyledTableCell>
            );
          })}
          {firstSlot?.length !== secondSlot?.length ? (
            <StyledTableCell></StyledTableCell>
          ) : null}
        </StyledTableRow>
      ) : null}
    </>
  );
};

export default AllAttendanceRow;
