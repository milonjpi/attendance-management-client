import { StyledTableCellWithBorder } from 'ui-component/table-component';
import moment from 'moment';
import ShowStatus from 'ui-component/ShowStatus';
import { TableRow } from '@mui/material';
import AllBillAction from './AllBillAction';

const AllBillRow = ({ sn, data }) => {
  const billDetails = data?.billDetails || [];
  const rowSpan = billDetails.length || 1;
  return (
    <>
      {/* Main Row */}
      <TableRow>
        <StyledTableCellWithBorder align="center" rowSpan={rowSpan}>
          {sn}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan}>
          {moment(data?.date).format('DD/MM/YYYY')}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan}>
          {data?.employee?.name}
        </StyledTableCellWithBorder>

        {/* First row includes totals and actions */}
        {billDetails.length > 0 && (
          <>
            <StyledTableCellWithBorder>
              {billDetails[0].item?.label}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder>
              {billDetails[0].details || 'n/a'}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="center">
              {billDetails[0]?.uom?.label || 'n/a'}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {data?.isService ? 'n/a' : billDetails[0].quantity}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {billDetails[0].amount}
            </StyledTableCellWithBorder>
          </>
        )}

        {/* Totals and Actions */}
        <StyledTableCellWithBorder align="right" rowSpan={rowSpan}>
          {data?.amount}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder align="center" rowSpan={rowSpan}>
          <ShowStatus status={data?.status} />
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder align="center" rowSpan={rowSpan}>
          <AllBillAction data={data} />
        </StyledTableCellWithBorder>
      </TableRow>

      {/* Remaining Income Details Rows */}
      {billDetails.slice(1).map((el, index) => (
        <TableRow key={index}>
          <StyledTableCellWithBorder>
            {el.item?.label}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder>
            {el.details || 'n/a'}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="center">
            {el?.uom?.label || 'n/a'}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {data?.isService ? 'n/a' : el.quantity}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.amount}
          </StyledTableCellWithBorder>
        </TableRow>
      ))}
    </>
  );
};

export default AllBillRow;
