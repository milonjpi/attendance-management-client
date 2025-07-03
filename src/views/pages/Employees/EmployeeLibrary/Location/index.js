import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import { IconPlus } from '@tabler/icons-react';
import { useGetLocationsQuery } from 'store/api/location/locationApi';
import AddLocation from './AddLocation';
import LocationRow from './LocationRow';
import { useDebounced } from 'hooks';
import { Autocomplete, TextField } from '@mui/material';
import { useGetAreasQuery } from 'store/api/area/areaApi';

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

const LocationPage = () => {
  const [searchText, setSearchText] = useState('');
  const [area, setArea] = useState(null);

  const [open, setOpen] = useState(false);

  // library
  const { data: areaData, isLoading: areaLoading } = useGetAreasQuery(
    { page: 0, limit: 1000, sortBy: 'label', sortOrder: 'asc' },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const allAreas = areaData?.areas || [];
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
  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['sortBy'] = 'label';
  query['sortOrder'] = 'asc';

  if (area) {
    query['areaId'] = area?.id;
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetLocationsQuery(
    { ...query },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const allLocations = data?.locations || [];
  const meta = data?.meta;
  return (
    <MainCard
      title="Branch List"
      secondary={
        <CardAction
          title="Add Branch"
          onClick={() => setOpen(true)}
          icon={<IconPlus />}
        />
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          columnSpacing={1}
          rowSpacing={2}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={3.5}>
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
              loading={areaLoading}
              value={area}
              fullWidth
              size="small"
              options={allAreas}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setArea(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Area" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* popup items */}

      <AddLocation open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Area</StyledTableCell>
              <StyledTableCell>Branch</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Geo Address</StyledTableCell>
              <StyledTableCell>Weekend</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allLocations?.length ? (
              allLocations.map((item, index) => (
                <LocationRow
                  key={item.id}
                  sn={page * rowsPerPage + index + 1}
                  data={item}
                />
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={10} sx={{ border: 0 }} align="center">
                  {isLoading ? (
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
        count={meta?.total || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

export default LocationPage;
