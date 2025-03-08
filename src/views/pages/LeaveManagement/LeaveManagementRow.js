import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { IconTrashXFilled } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import { Link } from 'react-router-dom';
import { IconEdit } from '@tabler/icons-react';
import UpdateLeave from './UpdateLeave';
import { useDeleteLeaveMutation } from 'store/api/leave/leaveApi';

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

const LeaveManagementRow = ({ sn, data }) => {
  const employee = data?.employee || null;

  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [deleteLeave] = useDeleteLeaveMutation();
  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteLeave(data?.id).unwrap();
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
        <span style={{ display: 'block', lineHeight: 1 }}>
          <Link
            to={`/pages/employee-management/employees/${data?.id}`}
            style={{ textDecoration: 'none' }}
          >
            {employee?.name}
          </Link>
        </span>
        <span style={{ fontSize: 9, lineHeight: 1 }}>
          {employee?.designation?.label + ', ' + employee?.department?.label}
        </span>
      </StyledTableCell>
      <StyledTableCell>{employee?.location?.label}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.fromDate).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>
        {moment(data?.toDate).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell align="center">{data?.days}</StyledTableCell>
      <StyledTableCell>{data?.remarks || 'n/a'}</StyledTableCell>
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
        {/* popup items */}
        <UpdateLeave
          open={open}
          handleClose={() => setOpen(false)}
          preData={data}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Attendance"
          handleDelete={handleDelete}
        />
        {/* end popup items */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default LeaveManagementRow;
