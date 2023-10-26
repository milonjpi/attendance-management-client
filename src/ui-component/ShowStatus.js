import Typography from '@mui/material/Typography';

const colors = {
  Pending: '#E53935',
  'In Progress': '#0747A6',
  Solved: '#006644',
  Approved: '#006644',
  'In Stand': '#006644',
};

const backgrounds = {
  Pending: '#ffcdd2',
  'In Progress': '#DEEBFF',
  Solved: '#E3FCEF',
  Approved: '#E3FCEF',
  'In Stand': '#E3FCEF',
};

const ShowStatus = ({ status }) => {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: 11,
        display: 'inline-block',
        textTransform: 'uppercase',
        p: 0.5,
        borderRadius: 1,
        fontWeight: 700,
        lineHeight: 1,
        color: colors[status] || '#42526E',
        background: backgrounds[status] || '#DFE1E6',
      }}
    >
      {status}
    </Typography>
  );
};

export default ShowStatus;
