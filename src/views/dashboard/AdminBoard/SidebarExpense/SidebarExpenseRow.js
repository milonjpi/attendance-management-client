// material-ui
import { Divider, Grid, Typography } from '@mui/material';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const SidebarExpenseRow = ({ title, base, value, isDivider }) => {
  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography
                variant="subtitle1"
                color="inherit"
                sx={{ fontSize: 12 }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    sx={{ fontSize: 12, fontWeight: 700 }}
                  >
                    {value}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle2"
            sx={{ color: 'secondary.dark', fontWeight: 700, fontSize: 11 }}
          >
            {base}
          </Typography>
        </Grid>
      </Grid>
      {isDivider ? <Divider sx={{ my: 1.5 }} /> : null}
    </>
  );
};

export default SidebarExpenseRow;
