import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';

const ViewBillRow = ({ sn, data, isService }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.item?.label}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.details || 'n/a'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.shop?.label || 'n/a'}
      </StyledTableCellWithBorder>
      {isService ? null : (
        <>
          <StyledTableCellWithBorder align="center">
            {data?.uom?.label}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {data?.quantity}
          </StyledTableCellWithBorder>
        </>
      )}

      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default ViewBillRow;
