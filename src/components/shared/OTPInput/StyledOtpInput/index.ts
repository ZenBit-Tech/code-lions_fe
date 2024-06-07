import { styled } from '@mui/system';
import theme from 'src/theme';

interface IStyledOtpInputProps {
  error: boolean;
}

const StyledOtpInput = styled('input')<IStyledOtpInputProps>(
  ({ error }) => `
    width: 45px;
    height: 45px;
    border-radius: 4px;
    border: 1px solid ${error ? theme.palette.error.main : theme.palette.border.secondary};
    padding: 12px 16px;
    font-family: ${theme.typography.fontFamily},
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    text-align: center;
    color: ${theme.palette.text.primary};
    box-shadow: 0px 2px 4px ${theme.palette.primary.light};
  
    &:hover, &:focus, &:active {
      border-color: ${error ? theme.palette.error.main : theme.palette.border.dark};
    }   
  `
);

export default StyledOtpInput;
