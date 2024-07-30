import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid } from '@mui/material';

import { profileOrdersTabs } from 'src/common/constants';

import OrderCard from './OrderCard';
import { TabButton, TabsWrapper } from './styles';

function ProfileOrders() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(profileOrdersTabs.CURRENT);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <TabsWrapper>
        <TabButton
          active={activeTab === profileOrdersTabs.CURRENT}
          onClick={() => handleTabClick(profileOrdersTabs.CURRENT)}
        >
          {t('profileOrders.current')}
        </TabButton>
        <TabButton
          active={activeTab === profileOrdersTabs.ARCHIVE}
          onClick={() => handleTabClick(profileOrdersTabs.ARCHIVE)}
        >
          {t('profileOrders.archive')}
        </TabButton>
      </TabsWrapper>
      <Grid container spacing={3}>
        <Grid item>
          <OrderCard />
        </Grid>
        <Grid item>
          <OrderCard />
        </Grid>
        <Grid item>
          <OrderCard />
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileOrders;
