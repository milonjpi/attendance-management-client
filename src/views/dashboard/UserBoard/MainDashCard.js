import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const shadows = {
  dark: '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14), 0rem 0.4375rem 0.625rem -0.3125rem rgba(64, 64, 64, 0.4)',
  primary:
    '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(0, 187, 212, 0.4)',
  secondary:
    '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(94, 53, 177, 0.4)',
  success:
    '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(76, 175, 79, 0.4)',
  error:
    '0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.14),0rem 0.4375rem 0.625rem -0.3125rem rgba(233, 30, 98, 0.4)',
};
const backgrounds = {
  dark: 'linear-gradient(195deg, #42424a, #191919)',
  primary: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
  secondary: 'linear-gradient(195deg, #6d4ab3, #5e35b1)',
  success: 'linear-gradient(195deg, #66BB6A, #43A047)',
  error: 'linear-gradient(195deg, #EC407A, #D81B60)',
};

const MainDashCard = ({
  title = 'Title',
  value = 0,
  base = 'this is base text',
  variant = 'dark',
  icon,
}) => {
  const CardIcon = icon || AccessAlarmIcon;
  return (
    <Box
      sx={{
        mb: 1.5,
      }}
    >
      <Paper
        sx={{
          boxShadow:
            '0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1),0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: 1,
            px: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '4rem',
              height: '4rem',
              mt: -3,
              opacity: 1,
              background: backgrounds[variant],
              color: '#ffffff',
              borderRadius: '0.75rem',
              boxShadow: shadows[variant],
            }}
          >
            <Icon>
              <CardIcon />
            </Icon>
          </Box>
          <Box
            sx={{
              textAlign: 'right',
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: 14,
                fontWeight: 300,
                color: '#7b809a',
                letterSpacing: 1,
              }}
            >
              {title}
            </Typography>
            <Typography
              component="h4"
              sx={{
                fontSize: 24,
                fontWeight: 700,
                color: '#344767',
              }}
            >
              {value}
            </Typography>
          </Box>
        </Box>
        <Divider
          sx={{
            borderColor: 'rgba(0,0,0,0.12)',
            backgroundColor: 'transparent',
            height: '0.0625rem',
            margin: '1rem 0',
            backgroundImage:
              'linear-gradient(to right, rgba(52, 71, 103, 0), rgba(52, 71, 103, 0.4), rgba(52, 71, 103, 0))!important',
            borderBottom: 'none',
            opacity: 0.25,
          }}
        />
        <Box
          sx={{
            pb: 2,
            px: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 300,
              lineHeight: 1.5,
              letterSpacing: '0.02857em',
              display: 'flex',
              color: '#7b809a',
            }}
          >
            {base}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default MainDashCard;
