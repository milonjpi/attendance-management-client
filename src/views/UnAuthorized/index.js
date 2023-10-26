import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';

const UnAuthorized = () => {
  return (
    <MainCard title="Error 403 | Forbidden">
      <Typography sx={{ color: 'red', fontSize: 20, textAlign: 'center' }}>
        You are not authorized in this page!!!!!
      </Typography>
    </MainCard>
  );
};

export default UnAuthorized;
