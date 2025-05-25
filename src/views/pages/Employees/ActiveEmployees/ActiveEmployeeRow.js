import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { useUpdateEmployeeMutation } from 'store/api/employee/employeeApi';
import UpdateEmployee from './UpdateEmployee';
import { Link } from 'react-router-dom';
import moment from 'moment';

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

const ActiveEmployeeRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [updateEmployee] = useUpdateEmployeeMutation();
  const handleDelete = async () => {
    setDialog(false);
    const newData = {
      isActive: false,
      resignDate: new Date(),
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
            message: 'Employee Resigned Successfully',
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
        <Link
          to={`/pages/employee-management/employees/${data?.id}`}
          style={{ textDecoration: 'none' }}
        >
          {data?.name}
        </Link>
      </StyledTableCell>
      <StyledTableCell>{data?.designation?.label}</StyledTableCell>
      <StyledTableCell>{data?.department?.label}</StyledTableCell>
      <StyledTableCell>
        {data?.location?.label + ', ' + data?.location?.area?.label}
      </StyledTableCell>
      <StyledTableCell>
        {data?.contactNo ? data?.contactNo : 'n/a'}
      </StyledTableCell>
      <StyledTableCell>
        {data?.joiningDate
          ? moment(data?.joiningDate).format('DD/MM/YYYY')
          : 'n/a'}
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ minWidth: 85 }}>
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{ minWidth: 0, mr: 0.5 }}
          onClick={() => setOpen(true)}
        >
          <IconEdit size={14} />
        </Button>

        <Button
          color="error"
          variant="contained"
          size="small"
          sx={{ minWidth: 0 }}
          onClick={() => setDialog(true)}
        >
          <IconTrashXFilled size={14} />
        </Button>
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Resign Employee"
          handleDelete={handleDelete}
        />
        <UpdateEmployee
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ActiveEmployeeRow;
