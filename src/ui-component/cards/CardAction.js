import { ButtonBase, Tooltip } from '@mui/material';

// project imports
import Avatar from '../extended/Avatar';

// ==============================|| CARD SECONDARY ACTION ||============================== //

const CardAction = ({ title, color = 'primary', onClick, icon }) => {
  return (
    <Tooltip title={title || 'Reference'} placement="left">
      <ButtonBase disableRipple>
        <Avatar size="badge" color={color} outline onClick={onClick}>
          {icon}
        </Avatar>
      </ButtonBase>
    </Tooltip>
  );
};

export default CardAction;
