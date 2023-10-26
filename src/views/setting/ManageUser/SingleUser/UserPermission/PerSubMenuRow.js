import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import PerSectionRow from './PerSectionRow';
import {
  useAddSubMenuMutation,
  useRemoveSubMenuMutation,
} from 'store/api/subMenu/subMenuSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#614cab',
    color: theme.palette.common.white,
    padding: '6px',
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

const PerSubMenuRow = ({ data, userId, subMenu, userSections }) => {
  const { title, children } = data;

  const dispatch = useDispatch();
  const [addSubMenu] = useAddSubMenuMutation();
  const [removeSubMenu] = useRemoveSubMenuMutation();

  const handleSubMenuPermission = async (e) => {
    const checkValue = e.target.checked;
    try {
      if (checkValue) {
        const newData = {
          userId,
          label: data?.id,
        };
        await addSubMenu({ ...newData }).unwrap();
      } else {
        await removeSubMenu(subMenu?.id).unwrap();
      }
    } catch (err) {
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: 'Something Went Wrong',
        })
      );
    }
  };
  return (
    <StyledTableRow>
      <StyledTableCell>
        <FormControlLabel
          control={<Checkbox size="small" />}
          checked={subMenu ? true : false}
          onChange={handleSubMenuPermission}
          label={title}
        />
      </StyledTableCell>
      <StyledTableCell>
        <Table>
          <TableBody>
            {children?.length
              ? children.map((el) => (
                  <PerSectionRow
                    key={el.id}
                    data={el}
                    userId={userId}
                    section={userSections?.find((tl) => tl.label === el.id)}
                  />
                ))
              : null}
          </TableBody>
        </Table>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PerSubMenuRow;
