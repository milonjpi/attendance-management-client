import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { useInactiveEmployeeMutation } from 'store/api/employee/employeeApi';
import UpdateEmployee from './UpdateEmployee';

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

  const dispatch = useDispatch();

  const [inactiveEmployee] = useInactiveEmployeeMutation();
  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await inactiveEmployee(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
      }
    } catch (err) {
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: err?.data?.message || 'Something Went Wrong',
          errorMessages: err?.data?.errorMessages,
        })
      );
    }
  };
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.id}</StyledTableCell>
      <StyledTableCell>{data?.name}</StyledTableCell>
      <StyledTableCell>
        {data?.officeId ? data?.officeId : 'n/a'}
      </StyledTableCell>
      <StyledTableCell>{data?.designation?.label}</StyledTableCell>
      <StyledTableCell>{data?.department?.label}</StyledTableCell>
      <StyledTableCell>{data?.location?.label}</StyledTableCell>
      <StyledTableCell>
        {data?.contactNo ? data?.contactNo : 'n/a'}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{ minWidth: 0, mr: 1 }}
          onClick={() => setOpen(true)}
        >
          <IconEdit size={16} />
        </Button>

        <Button
          color="error"
          variant="contained"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setDialog(true)}
        >
          <IconTrashXFilled size={16} />
        </Button>
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Inactive Employee"
          handleDelete={handleDelete}
        />
        <UpdateEmployee
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ActiveEmployeeRow;
