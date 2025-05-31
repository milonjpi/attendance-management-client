import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  useApproveTransferMutation,
  useDeleteTransferMutation,
} from 'store/api/transfer/transferApi';
import { Typography } from '@mui/material';
import ShowStatus from 'ui-component/ShowStatus';
import { IconCheckbox } from '@tabler/icons-react';
import UpdateTransfer from './UpdateTransfer';

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

const TransferEmployeeRow = ({ sn, data }) => {
  const [approve, setApprove] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [approveTransfer] = useApproveTransferMutation();
  const [deleteTransfer] = useDeleteTransferMutation();
  const handleApprove = async () => {
    setApprove(false);
    try {
      const res = await approveTransfer(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Transfer Approved Successfully',
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
  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteTransfer(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Transfer Deleted Successfully',
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
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>
        <Typography
          component={Link}
          to={`/pages/employee-management/employees/${data?.id}`}
          sx={{ fontSize: 11, textDecoration: 'none' }}
        >
          {data?.employee?.officeId + ', ' + data?.employee?.name}
        </Typography>
        <Typography sx={{ fontSize: 9 }}>
          {data?.employee?.designation?.label +
            ', ' +
            data?.employee?.department?.label}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        {data?.fromLocation?.label + ', ' + data?.fromLocation?.area?.label}
      </StyledTableCell>
      <StyledTableCell>
        {data?.toLocation?.label + ', ' + data?.toLocation?.area?.label}
      </StyledTableCell>
      <StyledTableCell>{data?.remarks || 'n/a'}</StyledTableCell>
      <StyledTableCell align="center">
        <ShowStatus status={data?.isApproved ? 'Approved' : 'Pending'} />
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ width: 125 }}>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          sx={{ minWidth: 0, mr: 0.5 }}
          onClick={() => setApprove(true)}
        >
          <IconCheckbox size={14} />
        </Button>
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
        <ConfirmDialog
          open={approve}
          setOpen={setApprove}
          content="Approve Transfer"
          handleDelete={handleApprove}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Transfer"
          handleDelete={handleDelete}
        />
        <UpdateTransfer
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TransferEmployeeRow;
