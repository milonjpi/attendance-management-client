import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { setRefresh } from 'store/refreshSlice';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { BASE_ADDRESS } from 'api/client';
import loadingImage from 'assets/images/load.png';

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

const GuardRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const handleDelete = () => {
    setDialog(false);
    axiosPrivate
      .delete(`/brand/${data?.id}`)
      .then((res) => {
        dispatch(setRefresh());
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res.data?.message,
          })
        );
      })
      .catch((err) => {
        dispatch(
          setToast({
            open: true,
            variant: 'error',
            message: err.response?.data?.message || 'Something Went Wrong',
            errorMessages: err.response?.data?.errorMessages,
          })
        );
      });
  };
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.officeId}</StyledTableCell>
      <StyledTableCell>{data?.name}</StyledTableCell>
      <StyledTableCell>{data?.designation}</StyledTableCell>
      <StyledTableCell>{data?.department}</StyledTableCell>
      <StyledTableCell align="center">
        <Box
          sx={{
            width: 50,
            height: 50,
            overflow: 'hidden',
            margin: 'auto',
          }}
        >
          {loading && (
            <img
              src={loadingImage}
              alt="Loading"
              style={{ display: 'inline-block', width: '100%' }}
            />
          )}
          <img
            src={`${BASE_ADDRESS}/uploads/bikers/${data?.photo}`}
            alt="Biker"
            style={{
              display: loading ? 'none' : 'inline-block',
              width: '100%',
            }}
            onLoad={() => setLoading(false)}
          />
        </Box>
      </StyledTableCell>
      <StyledTableCell align="center">
        <ButtonGroup>
          <IconButton
            color="primary"
            size="small"
            // onClick={() => setOpen(true)}
          >
            <IconEdit color="#468B97" size={18} />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            // onClick={() => setDialog(true)}
          >
            <IconTrashXFilled size={18} />
          </IconButton>
        </ButtonGroup>
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Brand"
          handleDelete={handleDelete}
        />
        {/* <UpdateBrand
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        /> */}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default GuardRow;
