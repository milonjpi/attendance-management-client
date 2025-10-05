// material-ui
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useCreateBulkMutation } from 'store/api/bulk/bulkApi';
import { setToast } from 'store/toastSlice';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Support = () => {
  const dispatch = useDispatch();

  const [createBulk] = useCreateBulkMutation();

  const onSubmit = async (data) => {
    try {
      const res = await createBulk().unwrap();
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
    <MainCard title="Support">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion
        tempos incident ut laborers et doolie magna alissa. Ut enif ad minim
        venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea
        commons construal. Duos aube grue dolor in reprehended in voltage veil
        esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate
        non president, sunk in culpa qui officiate descent molls anim id est
        labours.
      </Typography>
      <Button variant="contained" onClick={onSubmit}>
        Submit
      </Button>
    </MainCard>
  );
};

export default Support;
