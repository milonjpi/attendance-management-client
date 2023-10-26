import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ImageShower from 'ui-component/ImageShower';

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

const InStandBikerRow = ({ sn, data }) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.bikerId}</StyledTableCell>
      <StyledTableCell>{data?.officeId}</StyledTableCell>
      <StyledTableCell>
        <Typography sx={{ fontSize: 11 }}>{data?.name}</Typography>
        <Typography sx={{ fontSize: 10 }}>
          {data?.designation + ', ' + data?.department}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        {data?.brand + ' ' + data?.model + ' ' + data?.cc}
      </StyledTableCell>
      <StyledTableCell>{data?.regNo}</StyledTableCell>
      <StyledTableCell>
        <ImageShower url={data?.bikerPhoto} />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default InStandBikerRow;
