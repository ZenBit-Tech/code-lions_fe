import { Box, Typography } from '@mui/material';

interface IProfileFieldProps {
  label: string;
  value: string | null;
}

function ProfileField(props: IProfileFieldProps) {
  const { label, value } = props;

  return (
    <Box display="flex" flexDirection="column" height="74px" margin="16px 0">
      <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>
        {label}
      </Typography>
      <Box height="48px" padding="14px">
        <Typography>{value}</Typography>
      </Box>
    </Box>
  );
}

export default ProfileField;
