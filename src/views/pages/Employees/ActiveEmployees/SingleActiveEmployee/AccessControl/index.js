import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useOutletContext } from 'react-router';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { useState } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { Empty } from 'ui-component/table-component';
import UpdateAdditionalLocation from './UpdateAdditionalLocation';
import { useGetLocationsQuery } from 'store/api/location/locationApi';

const AccessControl = () => {
  const { data } = useOutletContext();
  const location = data?.location;
  const employeeLocations = data?.employeeLocations || [];
  const [update, setUpdate] = useState(false);

  // library
  const { data: locationData } = useGetLocationsQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const allLocations = locationData?.locations || [];
  const filterLocations = allLocations?.filter((el) => el.id !== location?.id);
  // end library

  return (
    <MainCard title="Access Control">
      <Grid
        container
        rowSpacing={5}
        columnSpacing={2}
        sx={{ alignItems: 'stretch' }}
      >
        <Grid item xs={12} md={6}>
          <SubCard title="Default Branch" sx={{ height: '100%' }}>
            <Typography sx={{ fontWeight: 700, fontSize: 12 }}>
              {location?.label + ', ' + location?.area?.label}
            </Typography>
          </SubCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <SubCard
            title="Additional Branch"
            secondary={
              <Tooltip title="Edit Branches">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => setUpdate(true)}
                >
                  <IconEdit size={16} />
                </IconButton>
              </Tooltip>
            }
            sx={{ height: '100%' }}
          >
            {
              <Grid container spacing={2}>
                {employeeLocations?.length ? (
                  employeeLocations?.map((el, index) => (
                    <Grid item xs={12} key={index}>
                      <Typography sx={{ fontWeight: 700, fontSize: 12 }}>
                        {index +
                          1 +
                          '. ' +
                          el.location?.label +
                          ', ' +
                          el.location?.area?.label}
                      </Typography>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Empty />
                  </Grid>
                )}
              </Grid>
            }

            {/* pop up items */}
            {data ? (
              <UpdateAdditionalLocation
                open={update}
                handleClose={() => setUpdate(false)}
                preData={data}
                employeeLocations={employeeLocations?.map(
                  (el) => el.locationId
                )}
                allLocations={filterLocations}
              />
            ) : null}

            {/* end pop up items */}
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default AccessControl;
