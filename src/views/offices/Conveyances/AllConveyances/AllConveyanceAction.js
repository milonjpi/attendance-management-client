import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import { IconMenu2 } from '@tabler/icons-react';
import { IconEye } from '@tabler/icons-react';
import ViewConveyance from '../ViewConveyance';

const AllConveyanceAction = ({ data }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const [open, setOpen] = useState(false);

  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // operation
  const [view, setView] = useState(false);

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        size="small"
        sx={{ minWidth: 0 }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <IconMenu2 size={14} />
      </Button>
      {/* popup items */}
      <ViewConveyance
        open={view}
        handleClose={() => setView(false)}
        data={data}
      />
      {/* popup items */}
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        sx={{ zIndex: 1000 }}
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ px: 1, pb: 0.5 }}>
                    <List
                      component="nav"
                      sx={{
                        width: '100%',
                        maxWidth: 170,
                        minWidth: 165,
                        zIndex: 1000,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%',
                        },
                        '& .MuiListItemButton-root': {
                          px: 1,
                          py: 0.5,
                          mt: 0.2,
                        },
                      }}
                    >
                      <ListItemButton
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                        }}
                        onClick={(e) => {
                          setView(true);
                          handleClose(e);
                        }}
                      >
                        <ListItemIcon>
                          <IconEye stroke={1.5} size="1.3rem" color="#614cab" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">Quick View</Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default AllConveyanceAction;
