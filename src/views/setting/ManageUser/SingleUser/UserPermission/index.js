import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Link, useOutletContext } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PerMenuRow from './PerMenuRow';
import MainCard from 'ui-component/cards/MainCard';
import menuItems from 'menu-items';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ededed',
    color: '#404040',
    padding: '6px',
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

const UserPermission = () => {
  const { data } = useOutletContext();

  const allMenus = menuItems.items;
  let sn = 1;
  return (
    <Box>
      <Box sx={{ py: 2 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          size="small"
          color="dark"
          sx={{ color: '#fff' }}
          component={Link}
          to="/utils/setting/manage-user"
        >
          Back
        </Button>
      </Box>
      <MainCard title="Permissions">
        {/* data table */}
        <Box sx={{ overflow: 'auto' }}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">SN</StyledTableCell>
                <StyledTableCell>Menu</StyledTableCell>
                <StyledTableCell>Submenus and Sections</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {allMenus?.length ? (
                allMenus?.map((item) => (
                  <PerMenuRow
                    data={item}
                    sn={sn++}
                    key={item.id}
                    userId={data?.id}
                    userMenu={data?.menus?.find((el) => el.label === item.id)}
                    userSubMenus={data?.subMenus}
                    userSections={data?.sections}
                  />
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan={5}>
                    No Data
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </MainCard>
    </Box>
  );
};

export default UserPermission;
