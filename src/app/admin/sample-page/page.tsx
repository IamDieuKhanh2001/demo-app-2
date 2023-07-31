import type { ReactElement } from 'react';
import { Typography } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';
import DashboardCard from '@/components/shared/DashboardCard';

const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Sample Page">
        <Typography>Trang mẫu</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;