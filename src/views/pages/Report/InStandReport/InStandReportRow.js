import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { calculateDuration } from 'views/utilities/NeedyFunction';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    padding: '6px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const InStandReportRow = ({ sn, data }) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.biker?.bikerId}</StyledTableCell>
      <StyledTableCell>{data?.biker?.officeId}</StyledTableCell>
      <StyledTableCell>
        <Typography sx={{ fontSize: 11 }}>{data?.biker?.name}</Typography>
        <Typography sx={{ fontSize: 10 }}>
          {data?.biker?.designation + ', ' + data?.biker?.department}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        <Typography sx={{ fontSize: 11 }}>
          {data?.biker?.brand +
            ' ' +
            data?.biker?.model +
            ' ' +
            data?.biker?.cc}
        </Typography>
        <Typography sx={{ fontSize: 10 }}>{data?.biker?.regNo}</Typography>
      </StyledTableCell>
      <StyledTableCell>
        <Typography sx={{ fontSize: 11 }}>{data?.entryGuard?.name}</Typography>
        <Typography sx={{ fontSize: 10 }}>
          {data?.entryGuard?.designation + ', ' + data?.entryGuard?.department}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        <Typography sx={{ fontSize: 11 }}>
          {moment(data?.inTime).format('hh:mm A')}
        </Typography>
        <Typography sx={{ fontSize: 10 }}>
          {moment(data?.inTime).format('DD/MM/YYYY')}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        {calculateDuration(data?.inTime, data?.outTime || new Date())}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default InStandReportRow;
