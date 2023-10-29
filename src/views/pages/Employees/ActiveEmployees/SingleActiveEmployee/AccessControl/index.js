import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddCardIcon from '@mui/icons-material/AddCard';
import { useOutletContext } from 'react-router';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  useDeleteDeviceUserMutation,
  useGetSingleDeviceUserQuery,
  useGetTerminalsByUserIdQuery,
} from 'store/api/device/deviceApi';
import TerminalRow from './TerminalRow';
import AssignCard from './AssignCard';
import { useState } from 'react';
import UpdateAssignCard from './UpdateAssignCard';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import AssignTerminal from './AssignTerminal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ede7f6',
    color: '#5e35b1',
    padding: '6px',
    fontSize: 11,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    padding: '6px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AccessControl = () => {
  const { data } = useOutletContext();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [terminal, setTerminal] = useState(false);

  // card assign data
  const { data: cards, isLoading: cardLoading } = useGetSingleDeviceUserQuery(
    data?.id || 1,
    { refetchOnMountOrArgChange: true }
  );
  const cardData = cards?.data || null;
  // find card code
  const rfId = parseInt(cardData?.RFID).toString(16);
  const codeStart = (
    '0' +
    parseInt(
      rfId.split('')[2] === '0' ? rfId.slice(0, 2) : rfId.slice(0, 3),
      16
    )
  ).slice(-3);
  const codeEnd = ('00' + parseInt(rfId.slice(-5), 16)).slice(-5);

  // all terminals data
  const { data: terminals, isLoading } = useGetTerminalsByUserIdQuery(
    data?.id || 1,
    { refetchOnMountOrArgChange: true }
  );
  const terminalData = terminals?.data || [];

  // handle remove card
  const dispatch = useDispatch();
  const [deleteDeviceUser] = useDeleteDeviceUserMutation();
  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteDeviceUser(cardData?.ID).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
      }
    } catch (err) {
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
  console.log(terminalData);
  return (
    <MainCard title="Access Control">
      <Grid
        container
        rowSpacing={5}
        columnSpacing={2}
        sx={{ alignItems: 'stretch' }}
      >
        <Grid item xs={12} md={6}>
          <SubCard title="Card Information" sx={{ height: '100%' }}>
            {cardData ? (
              <Grid container rowSpacing={5} columnSpacing={2}>
                <Grid item xs={6}>
                  <Typography sx={{ fontWeight: 700 }}>Employee ID:</Typography>
                  <Typography sx={{ fontSize: 13 }}>{cardData?.ID}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontWeight: 700 }}>Card Code:</Typography>
                  <Typography sx={{ fontSize: 13 }}>
                    {codeStart + ',' + codeEnd}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mr: 2 }}
                      onClick={() => setUpdate(true)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={() => setDialog(true)}
                    >
                      Remove
                    </Button>
                    {/* popup items */}
                    {cardData ? (
                      <>
                        <UpdateAssignCard
                          open={update}
                          handleClose={() => setUpdate(false)}
                          employeeId={cardData?.ID}
                          codeStart={codeStart}
                          codeEnd={codeEnd}
                        />
                        <ConfirmDialog
                          open={dialog}
                          setOpen={setDialog}
                          content="Remove Card"
                          handleDelete={handleDelete}
                        />
                      </>
                    ) : null}
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <>
                <Box sx={{ textAlign: 'center' }}>
                  {cardLoading ? (
                    <CircularProgress size={30} />
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddCardIcon />}
                      onClick={() => setOpen(true)}
                    >
                      Add Card
                    </Button>
                  )}
                </Box>
                {/* popup items */}
                {data ? (
                  <AssignCard
                    open={open}
                    handleClose={() => setOpen(false)}
                    employeeData={data}
                  />
                ) : null}

                {/* end popup items */}
              </>
            )}
          </SubCard>
        </Grid>
        {cardData ? (
          <Grid item xs={12} md={6}>
            <SubCard
              title="Allowed Terminals"
              secondary={
                <Tooltip title="Assign Terminal">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => setTerminal(true)}
                  >
                    <AddCircleIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              }
              sx={{ height: '100%' }}
            >
              {/* popup items */}
              <AssignTerminal
                open={terminal}
                handleClose={() => setTerminal(false)}
                cardData={cardData}
                assignedTerminals={terminalData?.map((el) => el.TerminalID)}
              />
              {/* end popup items */}
              <Table>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Terminal ID</StyledTableCell>
                    <StyledTableCell>Terminal Name</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {terminalData?.length ? (
                    terminalData.map((item) => (
                      <TerminalRow key={item.TerminalID} data={item} />
                    ))
                  ) : (
                    <StyledTableRow>
                      <StyledTableCell
                        colSpan={3}
                        sx={{ border: 0 }}
                        align="center"
                      >
                        {isLoading ? <CircularProgress size={30} /> : 'No Data'}
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </SubCard>
          </Grid>
        ) : null}
      </Grid>
    </MainCard>
  );
};

export default AccessControl;
