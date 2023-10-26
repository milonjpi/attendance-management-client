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

const BikerRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

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

export default BikerRow;
