import React, { forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ConfirmDialog = ({ open, setOpen, content, handleDelete }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          minWidth: { xs: 250, sm: 350, md: 450 },
          fontSize: 25,
          color: '#614cab',
        }}
      >
        {content}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'red', opacity: 0.8 }}>
          Are You Sure to do this?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="success"
          sx={{ px: 3 }}
          onClick={handleClose}
        >
          No
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ px: 3 }}
          onClick={handleDelete}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
