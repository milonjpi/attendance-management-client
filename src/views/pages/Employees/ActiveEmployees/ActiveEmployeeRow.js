import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import UpdateEmployee from './UpdateEmployee';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ResignEmployee from './ResignEmployee';

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

const ActiveEmployeeRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.officeId}</StyledTableCell>
      <StyledTableCell>
        <Link
          to={`/pages/employee-management/employees/${data?.id}`}
          style={{ textDecoration: 'none' }}
        >
          {data?.name}
        </Link>
      </StyledTableCell>
      <StyledTableCell>{data?.designation?.label}</StyledTableCell>
      <StyledTableCell>{data?.department?.label}</StyledTableCell>
      <StyledTableCell>
        {data?.location?.label + ', ' + data?.location?.area?.label}
      </StyledTableCell>
      <StyledTableCell>
        {data?.contactNo ? data?.contactNo : 'n/a'}
      </StyledTableCell>
      <StyledTableCell>
        {data?.joiningDate
          ? moment(data?.joiningDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ minWidth: 85 }}>
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{ minWidth: 0, mr: 0.5 }}
          onClick={() => setOpen(true)}
        >
          <IconEdit size={14} />
        </Button>

        <Button
          color="error"
          variant="contained"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setDialog(true)}
        >
          <IconTrashXFilled size={14} />
        </Button>

        <UpdateEmployee
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
        <ResignEmployee
          open={dialog}
          preData={data}
          handleClose={() => setDialog(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ActiveEmployeeRow;
