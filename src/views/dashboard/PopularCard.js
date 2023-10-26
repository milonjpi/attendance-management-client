import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import axios from 'axios';
import { useEffect } from 'react';
import moment from 'moment';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = () => {
    const theme = useTheme();
    const [data, setData] = useState(null);
    const [top, setTop] = useState('Top Buyers');
    const [isLoading, setLoading] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTop = (val) => {
        setTop(val);
        handleClose();
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://tbz-vehicle-server.vercel.app/roReport/highest')
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);
    // filtering
    const filterBuyer = data?.roClients?.slice(0, 8);
    const filterQty = data?.roSales?.slice(0, 8);
    const filterColl = data?.roReceived?.slice(0, 8);
    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">{top}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={() => handleTop('Top Buyers')}> Top Buyers</MenuItem>
                                            <MenuItem onClick={() => handleTop('Top Sales Qty')}> Top Sales Qty</MenuItem>
                                            <MenuItem onClick={() => handleTop('Top Collections')}> Top Collections</MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {top === 'Top Buyers'
                                    ? filterBuyer?.map((item, index) => {
                                          return (
                                              <ClientRow
                                                  key={index}
                                                  title={item.clientName}
                                                  base={item.address}
                                                  value={item.saleQty}
                                                  isDivider={index === 7 ? false : true}
                                              />
                                          );
                                      })
                                    : top === 'Top Sales Qty'
                                    ? filterQty?.map((item, index) => {
                                          return (
                                              <ClientRow
                                                  key={index}
                                                  title={moment(new Date(item._id?.year, item._id?.month - 1, item._id?.day)).format(
                                                      'DD-MM-YYYY'
                                                  )}
                                                  base={`৳ ${item.amount}`}
                                                  value={item.qty}
                                                  isDivider={index === 7 ? false : true}
                                              />
                                          );
                                      })
                                    : filterColl?.map((item, index) => {
                                          return (
                                              <ClientRow
                                                  key={index}
                                                  title={moment(new Date(item._id?.year, item._id?.month - 1, item._id?.day)).format(
                                                      'DD-MM-YYYY'
                                                  )}
                                                  base={`Top ${index + 1}`}
                                                  value={`৳ ${item.amount}`}
                                                  isDivider={index === 7 ? false : true}
                                              />
                                          );
                                      })}
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;

const ClientRow = ({ title, base, value, isDivider }) => {
    const theme = useTheme();
    return (
        <>
            <Grid container direction="column">
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        {value}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            borderRadius: '5px',
                                            backgroundColor: theme.palette.success.light,
                                            color: theme.palette.success.dark,
                                            ml: 2
                                        }}
                                    >
                                        <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                        {base}
                    </Typography>
                </Grid>
            </Grid>
            {isDivider ? <Divider sx={{ my: 1.5 }} /> : null}
        </>
    );
};
