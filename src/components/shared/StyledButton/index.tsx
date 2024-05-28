import { styled } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { StyledButtonProps } from './types';
import { ButtonPaddings, ButtonStyles } from './styles';

const StyledButton = styled(LoadingButton)<StyledButtonProps>(
  ({ theme, ...props }) => ({
    width: props.width,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    borderRadius: props.radius || '12px',
    lineHeight: 1,
    cursor: 'pointer',
    padding: ButtonPaddings[props.padding],
    ...ButtonStyles[props.styles],
    '&:hover, &:active, &:focus': {
      backgroundColor: ButtonStyles[props.styles].backgroundColor,
    },
    '&:hover': {
      opacity: theme.palette.action.hoverOpacity,
    },
  })
);

export default StyledButton;
