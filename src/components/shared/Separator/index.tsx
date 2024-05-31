import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ISeparatorProps {
  text: string;
}

function Separator({ text }: ISeparatorProps): JSX.Element {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" width="100%" mt="20px" mb="20px">
      <Box flexGrow={1} height="1px" bgcolor={theme.palette.border.primary} />
      <Box width="64px" display="flex" justifyContent="center">
        <Typography variant="overline" color={theme.palette.text.primary}>
          {text}
        </Typography>
      </Box>
      <Box flexGrow={1} height="1px" bgcolor={theme.palette.border.primary} />
    </Box>
  );
}

export default Separator;
