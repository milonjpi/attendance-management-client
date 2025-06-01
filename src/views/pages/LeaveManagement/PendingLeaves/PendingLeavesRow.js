import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { IconCheckbox } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import { Link } from 'react-router-dom';
import { useUpdateLeaveMutation } from 'store/api/leave/leaveApi';
import ShowStatus from 'ui-component/ShowStatus';
import { IconBan } from '@tabler/icons';

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

const PendingLeavesRow = ({ sn, data }) => {
  const employee = data?.employee || null;

  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);

  const dispatch = useDispatch();

  const [updateLeave] = useUpdateLeaveMutation();

  const handleApprove = async () => {
    setApprove(false);
    try {
      const res = await updateLeave({
        id: data?.id,
        data: { status: 'Approved' },
      }).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Leave Approved Successfully',
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

  const handleReject = async () => {
    setReject(false);
    try {
      const res = await updateLeave({
        id: data?.id,
        data: { status: 'Rejected' },
      }).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Leave Rejected Successfully',
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
      <StyledTableCell>
        {employee?.location?.label + ', ' + employee?.location?.area?.label}
      </StyledTableCell>
      <StyledTableCell>
        {moment(data?.fromDate).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>
        {moment(data?.toDate).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell align="center">{data?.days}</StyledTableCell>
      <StyledTableCell>{data?.remarks || 'n/a'}</StyledTableCell>
      <StyledTableCell align="center">
        <ShowStatus status={data?.status} />
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ minWidth: 85 }}>
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{ minWidth: 0, mr: 0.5 }}
          onClick={() => setApprove(true)}
        >
          <IconCheckbox size={14} />
        </Button>
        <Button
          color="error"
          variant="contained"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setReject(true)}
        >
          <IconBan size={14} />
        </Button>
        {/* popup items */}
        <ConfirmDialog
          open={approve}
          setOpen={setApprove}
          content="Leave Approve"
          handleDelete={handleApprove}
        />
        <ConfirmDialog
          open={reject}
          setOpen={setReject}
          content="Leave Reject"
          handleDelete={handleReject}
        />
        {/* end popup items */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PendingLeavesRow;
