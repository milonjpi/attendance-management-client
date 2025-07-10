import { StyledTableCellWithNarrowBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';

const ViewBillRow = ({ sn, data, isService }) => {
  return (
    <TableRow>
      <StyledTableCellWithNarrowBorder align="center">
        {sn}
      </StyledTableCellWithNarrowBorder>
      <StyledTableCellWithNarrowBorder>
        {data?.item?.label}
      </StyledTableCellWithNarrowBorder>
      <StyledTableCellWithNarrowBorder>
        {data?.details || 'n/a'}
      </StyledTableCellWithNarrowBorder>
      <StyledTableCellWithNarrowBorder>
        {data?.shop?.label || 'n/a'}
      </StyledTableCellWithNarrowBorder>
      {isService ? null : (
        <>
          <StyledTableCellWithNarrowBorder align="center">
            {data?.uom?.label}
          </StyledTableCellWithNarrowBorder>
          <StyledTableCellWithNarrowBorder align="right">
            {data?.quantity}
          </StyledTableCellWithNarrowBorder>
        </>
      )}

      <StyledTableCellWithNarrowBorder align="right">
        {data?.amount}
      </StyledTableCellWithNarrowBorder>
    </TableRow>
  );
};

export default ViewBillRow;
