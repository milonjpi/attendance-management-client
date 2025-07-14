import { Box, Typography } from '@mui/material';

const PaySlipItem = ({ title, value, sx = {} }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Typography
        sx={{
          width: 100,
          fontWeight: 500,
          fontSize: 11,
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ px: 0.5, fontSize: 11 }}>:</Typography>
      <Typography sx={{ fontSize: 11 }}>{value}</Typography>
    </Box>
  );
};

export default PaySlipItem;
