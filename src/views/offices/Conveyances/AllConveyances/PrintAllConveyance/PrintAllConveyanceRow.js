import { StyledTableCellWithBorder } from 'ui-component/table-component';
import moment from 'moment';
import ShowStatus from 'ui-component/ShowStatus';
import { TableRow } from '@mui/material';

const PrintAllConveyanceRow = ({ sn, data }) => {
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
        {/* First row includes totals and actions */}
        {conveyanceDetails.length > 0 ? (
          <>
            <StyledTableCellWithBorder>
              {conveyanceDetails[0].itemType?.label}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder>
              {conveyanceDetails[0].itemType?.label?.toLowerCase() ===
              'transport' ? (
                <span>
                  {conveyanceDetails[0].from}
                  <em> to </em>
                  {conveyanceDetails[0].to}
                  <em> by </em>
                  {conveyanceDetails[0].vehicleType?.label} &#40;
                  {conveyanceDetails[0].distance} km&#41;
                </span>
              ) : (
                conveyanceDetails[0].details
              )}
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
          {data?.amount}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder align="center" rowSpan={rowSpan}>
          <ShowStatus status={data?.status} />
        </StyledTableCellWithBorder>
      </TableRow>

      {/* Remaining Income Details Rows */}
      {conveyanceDetails.slice(1).map((el, index) => (
        <TableRow key={index}>
          <StyledTableCellWithBorder>
            {el.itemType?.label}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder>
            {el.itemType?.label?.toLowerCase() === 'transport' ? (
              <span>
                {el.from}
                <em> to </em>
                {el.to}
                <em> by </em>
                {el.vehicleType?.label} &#40;
                {el.distance} km&#41;
              </span>
            ) : (
              el.details
            )}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.amount}
          </StyledTableCellWithBorder>
        </TableRow>
      ))}
    </>
  );
};

export default PrintAllConveyanceRow;
