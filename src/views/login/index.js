import { useForm } from 'react-hook-form';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
  Divider,
  Button,
  Grid,
  Box,
  Stack,
  Typography,
  useMediaQuery,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from '@mui/material';

// project imports
import AuthCardWrapper from './AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import Toast from 'ui-component/toast/Toast';
import { useLoginMutation } from 'store/api/auth/authApi';
import { storeUserInfo } from 'services/auth.service';
import { setRefresh } from 'store/refreshSlice';

const AuthWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: '100vh',
}));

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [checked, setChecked] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { register, handleSubmit, reset } = useForm();

  const [login] = useLoginMutation();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await login({ ...data }).unwrap();
      if (res.success) {
        storeUserInfo({ accessToken: res?.data?.accessToken });
        setLoading(false);
        dispatch(setRefresh());
        reset();
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
    <AuthWrapper>
      {/* pop up items */}
      <Toast />
      {/* end pop up items */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: 'calc(100vh - 68px)' }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 3 }}>
                    <Logo />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? 'column-reverse' : 'row'}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? 'h3' : 'h2'}
                          >
                            Hi, Welcome Back
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? 'center' : 'inherit'}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      component="form"
                      autoComplete="off"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <FormControl
                        fullWidth
                        sx={{ ...theme.typography.customInput }}
                        required
                      >
                        <InputLabel htmlFor="outlined-adornment-email-login">
                          User Name
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-email-login"
                          label="User Name"
                          {...register('userName')}
                        />
                      </FormControl>

                      <FormControl
                        fullWidth
                        sx={{ ...theme.typography.customInput }}
                        required
                      >
                        <InputLabel htmlFor="outlined-adornment-password-login">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password-login"
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                          {...register('password')}
                        />
                      </FormControl>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={1}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={(event) =>
                                setChecked(event.target.checked)
                              }
                              name="checked"
                              color="primary"
                            />
                          }
                          label="Remember me"
                        />
                        <Tooltip title="Please Contact With Admin">
                          <Typography
                            variant="subtitle1"
                            color="secondary"
                            sx={{ textDecoration: 'none', cursor: 'pointer' }}
                          >
                            Forgot Password?
                          </Typography>
                        </Tooltip>
                      </Stack>

                      <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                          <Button
                            disableElevation
                            disabled={loading}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="secondary"
                          >
                            Sign in
                          </Button>
                        </AnimateButton>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      xs={12}
                    >
                      <Tooltip title="Please Contact With Admin">
                        <Typography
                          variant="subtitle1"
                          sx={{ textDecoration: 'none', cursor: 'pointer' }}
                        >
                          Don&apos;t have an account?
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default Login;
