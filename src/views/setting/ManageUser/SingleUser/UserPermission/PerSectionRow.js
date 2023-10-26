import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import {
  useAddSectionMutation,
  useRemoveSectionMutation,
} from 'store/api/section/sectionApi';

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

const PerSectionRow = ({ data, userId, section }) => {
  const { title } = data;

  const dispatch = useDispatch();
  const [addSection] = useAddSectionMutation();
  const [removeSection] = useRemoveSectionMutation();

  const handleSectionPermission = async (e) => {
    const checkValue = e.target.checked;

    try {
      if (checkValue) {
        const newData = {
          userId,
          label: data?.id,
        };
        await addSection({ ...newData }).unwrap();
      } else {
        await removeSection(section?.id).unwrap();
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
          checked={section ? true : false}
          onChange={handleSectionPermission}
          label={title}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PerSectionRow;
