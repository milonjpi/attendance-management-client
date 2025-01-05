import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { useRemoveTerminalMutation } from 'store/api/device/deviceApi';

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

const TerminalRow = ({ data }) => {
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [removeTerminal] = useRemoveTerminalMutation();
  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await removeTerminal({
        id: data?.UserID,
        body: { TerminalID: data?.TerminalID },
      }).unwrap();
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
      <StyledTableCell>{data?.TerminalID}</StyledTableCell>
      <StyledTableCell>{data?.Name}</StyledTableCell>
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
          content="Remove Terminal"
          handleDelete={handleDelete}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TerminalRow;
