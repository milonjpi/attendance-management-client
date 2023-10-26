import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const ViewImage = ({ open, handleClose, url }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} onClick={handleClose}>
        <Button
          color="error"
          sx={{
            width: 25,
            height: 25,
            position: 'absolute',
            top: 20,
            right: 20,
            background: '#ccc',
            minWidth: 0,
            '&:hover': {
              background: '#ccc',
            },
          }}
          onClick={handleClose}
        >
          <CloseIcon sx={{ fontSize: 22 }} />
        </Button>
        <Fade in={open} timeout={500} sx={{ outline: 'none' }}>
          <img
            src={url}
            alt="asd"
            style={{ maxHeight: '90%', maxWidth: '90%' }}
            onClick={(e) => e.stopPropagation()}
          />
        </Fade>
      </Box>
    </Modal>
  );
};

export default ViewImage;
