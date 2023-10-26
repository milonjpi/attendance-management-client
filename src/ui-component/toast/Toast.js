import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setToast } from 'store/toastSlice';

const Toast = () => {
  const toastState = useSelector((state) => state.toast);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(
      setToast({
        ...toastState,
        open: false,
        errorMessages: null,
      })
    );
  };

  return (
    <Snackbar
      open={toastState?.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={toastState?.variant}
        sx={{ width: { xs: 300, md: 350 } }}
      >
        <Typography>{toastState?.message}</Typography>
        {toastState?.errorMessages?.map((el, index) => (
          <Typography key={index} sx={{ fontSize: 11 }}>
            {el?.message}
          </Typography>
        ))}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
