import { StyledTableCellWithBorder } from 'ui-component/table-component';
import moment from 'moment';
import ShowStatus from 'ui-component/ShowStatus';
import { TableRow } from '@mui/material';
import PendingConveyanceAction from './PendingConveyanceAction';

const PendingConveyanceRow = ({ sn, data }) => {
  const conveyanceDetails = data?.conveyanceDetails || [];
  const rowSpan = conveyanceDetails.length || 1;
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
        <StyledTableCellWithBorder rowSpan={rowSpan}>
          {data?.from + ' '}
          <em>to</em>
          {' ' + data?.to}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan} align="right">
          {data?.distance}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan} align="right">
          {data?.amount}
        </StyledTableCellWithBorder>

        {/* First row includes totals and actions */}
        {conveyanceDetails.length > 0 ? (
          <>
            <StyledTableCellWithBorder>
              {conveyanceDetails[0].itemType?.label}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder>
              {conveyanceDetails[0].details}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {conveyanceDetails[0].amount}
            </StyledTableCellWithBorder>
          </>
        ) : (
          <StyledTableCellWithBorder colSpan={3} align="center">
            n/a
          </StyledTableCellWithBorder>
        )}

        {/* Totals and Actions */}
        <StyledTableCellWithBorder align="right" rowSpan={rowSpan}>
          {data?.amount + data?.extraAmount}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder align="center" rowSpan={rowSpan}>
          <ShowStatus status={data?.status} />
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder align="center" rowSpan={rowSpan}>
          <PendingConveyanceAction data={data} />
        </StyledTableCellWithBorder>
      </TableRow>

      {/* Remaining Income Details Rows */}
      {conveyanceDetails.slice(1).map((el, index) => (
        <TableRow key={index}>
          <StyledTableCellWithBorder>
            {el.itemType?.label}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder>{el.details}</StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.amount}
          </StyledTableCellWithBorder>
        </TableRow>
      ))}
    </>
  );
};

export default PendingConveyanceRow;
