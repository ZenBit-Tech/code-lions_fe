import { Box, Typography } from '@mui/material';

interface IVendorSectionTitleProps {
  title: string;
}

function VendorSectionTitle({ title }: IVendorSectionTitleProps) {
  return (
    <Box>
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: 600, lineHeight: 1.25 }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default VendorSectionTitle;
