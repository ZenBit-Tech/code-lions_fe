import { Grid } from '@mui/material';

import BuyerInfoSection from './BuyerInfoSection';
import OrderDetailsSection from './OrderDetailsSection';
import OrderInfoSection from './OrderInfoSection';
import OrderProductsTable from './OrderProductsTable';
import OrderSummarySection from './OrderSummarySection';

function VendorOrderPage() {
  return (
    <OrderDetailsSection>
      <Grid container columns={7} sx={{ padding: '12px' }}>
        <Grid item xs={5} sx={{ paddingRight: '24px' }}>
          <OrderInfoSection />
          <OrderProductsTable />
          <OrderSummarySection />
        </Grid>
        <Grid item xs={2}>
          <BuyerInfoSection />
        </Grid>
      </Grid>
    </OrderDetailsSection>
  );
}

export default VendorOrderPage;
