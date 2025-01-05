import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { IconRestore } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUpdateEmployeeMutation } from 'store/api/employee/employeeApi';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

const ResignedEmployeeRow = ({ sn, data }) => {
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [updateEmployee] = useUpdateEmployeeMutation();
  const handleDelete = async () => {
    setDialog(false);
    const newData = {
      isActive: true,
      resignDate: null,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(newData));
    try {
      const res = await updateEmployee({
        id: data?.id,
        body: formData,
      }).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Employee Restored Successfully',
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
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.officeId}</StyledTableCell>
      <StyledTableCell>
        <Link to={`/pages/employee-management/employees/${data?.id}`}>
          {data?.name}
        </Link>
      </StyledTableCell>
      <StyledTableCell>{data?.designation?.label}</StyledTableCell>
      <StyledTableCell>{data?.department?.label}</StyledTableCell>
      <StyledTableCell>{data?.location?.label}</StyledTableCell>
      <StyledTableCell>
        {data?.contactNo ? data?.contactNo : 'n/a'}
      </StyledTableCell>
      <StyledTableCell>
        {data?.joiningDate
          ? moment(data?.joiningDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCell>
      <StyledTableCell>
        {data?.resignDate
          ? moment(data?.resignDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setDialog(true)}
        >
          <IconRestore size={14} />
        </Button>
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Restore Employee"
          handleDelete={handleDelete}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ResignedEmployeeRow;
