import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import {
  useAssignTerminalMutation,
  useGetAllTerminalsQuery,
} from 'store/api/device/deviceApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 450, md: 550 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 3,
};

const AssignTerminal = ({
  open,
  handleClose,
  cardData,
  assignedTerminals = [],
}) => {
  const [loading, setLoading] = useState(false);
  const [terminal, setTerminal] = useState('');

  const { data } = useGetAllTerminalsQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const allTerminals = data?.data || [];
  const filterTerminals = allTerminals.filter(
    (el) => !assignedTerminals.includes(el.ID)
  );

  const dispatch = useDispatch();

  const [assignTerminal] = useAssignTerminalMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newData = {
      UserIDIndex: cardData?.IndexKey,
      TerminalID: terminal,
      UserID: cardData?.ID,
    };
    try {
      const res = await assignTerminal({ ...newData }).unwrap();

      if (res.success) {
        handleClose();
        setTerminal('');
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
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
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 16, color: '#878781' }}>
            Assign Terminal
          </Typography>
          <IconButton
            color="error"
            sx={{ width: 25, height: 25 }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        <Box component="form" autoComplete="off" onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="select-terminal-id">Select Terminal</InputLabel>
                <Select
                  labelId="select-terminal-id"
                  value={terminal}
                  label="Select Terminal"
                  onChange={(e) => setTerminal(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {filterTerminals.map((el) => (
                    <MenuItem key={el.ID} value={el.ID}>
                      {el.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="small"
                color="primary"
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AssignTerminal;
