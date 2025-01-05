import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { IconTrashXFilled } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { useDispatch } from 'react-redux';
import { useDeleteAttendanceMutation } from 'store/api/attendance/attendanceApi';
import { setToast } from 'store/toastSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: '6px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const PresentManagementRow = ({ sn, data }) => {
  const employee = data?.employee || null;

  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [deleteAttendance] = useDeleteAttendanceMutation();
  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteAttendance(data?.id).unwrap();
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
      <StyledTableCell>
        {moment(data?.inTime).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>{employee?.name}</StyledTableCell>
      <StyledTableCell>{employee?.designation?.label}</StyledTableCell>
      <StyledTableCell>{employee?.department?.label}</StyledTableCell>
      <StyledTableCell>{employee?.location?.label}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.inTime).utc().format('hh:mm A')}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button
          color="error"
          variant="contained"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setDialog(true)}
        >
          <IconTrashXFilled size={14} />
        </Button>
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Attendance"
          handleDelete={handleDelete}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PresentManagementRow;
