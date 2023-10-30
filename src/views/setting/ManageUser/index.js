import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import AddUser from './AddUser';
import ManageUserRow from './ManageUserRow';
import { useGetUsersQuery } from 'store/api/user/userApi';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ede7f6',
    color: '#5e35b1',
    padding: '7px 6px',
    fontSize: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: '6px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ManageUser = () => {
  const [searchText, setSearchText] = useState('');

  const [open, setOpen] = useState(false);

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // end pagination

  const { data, isLoading } = useGetUsersQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const usersData = data?.data || [];

  const filterData = usersData?.filter(
    (item) =>
      item.userName?.toLowerCase().includes(searchText?.toLowerCase()) ||
      item.fullName?.toLowerCase().includes(searchText?.toLowerCase())
  );
  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Manage Users"
      secondary={
        <CardAction
          title="Add User"
          onClick={() => setOpen(true)}
          icon={<AddIcon />}
        />
      }
    >
      {/* popups item */}
      <AddUser open={open} handleClose={() => setOpen(false)} />
      {/* end popups item */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={6}>
            <InputBase
              fullWidth
              placeholder="Search by Name, UserName etc"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ borderBottom: '1px solid #ccc' }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell
                align="center"
                sx={{ borderRadius: '5px 0 0 5px' }}
              >
                SN
              </StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ borderRadius: '0 5px 5px 0' }}
              >
                Action
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {filterData?.length ? (
              filterData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <ManageUserRow key={item.id} sn={sn++} data={item} />
                ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={10} sx={{ border: 0 }} align="center">
                  {isLoading ? (
                    <LinearProgress
                      color="primary"
                      sx={{ opacity: 0.5, py: 0.5 }}
                    />
                  ) : (
                    'No Data'
                  )}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 20, 40]}
        component="div"
        count={filterData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

export default ManageUser;
