import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import UpdateUser from './UpdateUser';
import { roleValue } from 'assets/data';
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from 'store/api/user/userApi';
import { Switch } from '@mui/material';

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

const ManageUserRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteUser(data?.id).unwrap();
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

  const handleBranchManager = async (e) => {
    try {
      await updateUser({
        id: data?.id,
        body: { role: e.target.checked ? 'admin' : 'user' },
      }).unwrap();
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
        <Link to={`${data?.id}`} style={{ textDecoration: 'none' }}>
          {data?.fullName}
        </Link>
      </StyledTableCell>
      <StyledTableCell>{data?.userName}</StyledTableCell>
      <StyledTableCell>{roleValue[data?.role] || ''}</StyledTableCell>
      <StyledTableCell align="center">
        <Switch
          disabled={data?.role === 'super_admin'}
          checked={data?.role === 'admin' || false}
          onChange={handleBranchManager}
        />
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ minWidth: 85 }}>
        <Button
          disabled={data?.isEmployee}
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
          open={dialog}
          setOpen={setDialog}
          content="Delete User"
          handleDelete={handleDelete}
        />
        <UpdateUser
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ManageUserRow;
