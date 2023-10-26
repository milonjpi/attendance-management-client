import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useSelector } from 'react-redux';
import { selectRefresh } from 'store/refreshSlice';
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import { IconPlus } from '@tabler/icons-react';
import AddModel from './AddModel';
import ModelRow from './ModelRow';
import { useGetBrandsQuery } from 'store/features/brand/brandApi';
import { selectAuth } from 'store/authSlice';

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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Model = () => {
  const auth = useSelector(selectAuth);
  const [searchText, setSearchText] = useState('');
  const [brand, setBrand] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  // library
  const { data: brandData } = useGetBrandsQuery(auth?.accessToken, {
    refetchOnMountOrArgChange: true,
  });
  const allBrands = brandData?.data || [];
  // end library

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

  const axiosPrivate = useAxiosPrivate();
  const refresh = useSelector(selectRefresh);

  useEffect(() => {
    setLoading(true);
    axiosPrivate
      .get('/model')
      .then((res) => {
        setData(res.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [refresh, axiosPrivate]);

  const filterData = data
    ?.filter(
      (item) =>
        (brand ? item.brandId === brand.id : true) &&
        item.label?.toLowerCase().includes(searchText?.toLowerCase())
    )
    .sort(
      (a, b) =>
        a.brand?.label.localeCompare(b.brand?.label) ||
        a.label.localeCompare(b.label)
    );

  let sn = 1;

  return (
    <MainCard
      title="Models"
      secondary={
        <CardAction
          title="Add Model"
          onClick={() => setOpen(true)}
          icon={<IconPlus />}
        />
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={6}>
            <InputBase
              fullWidth
              placeholder="Search..."
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
          <Grid item xs={12} md={3}>
            <Autocomplete
              value={brand}
              fullWidth
              size="small"
              options={allBrands}
              getOptionLabel={(option) => option.label}
              onChange={(e, newValue) => setBrand(newValue)}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Select Brand" required />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* popup items */}

      <AddModel open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Brand</StyledTableCell>
              <StyledTableCell>Model</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {filterData?.length ? (
              filterData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => <ModelRow key={item.id} sn={sn++} data={item} />)
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={10} sx={{ border: 0 }} align="center">
                  {loading ? (
                    <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
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

export default Model;
