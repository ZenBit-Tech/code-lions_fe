import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/system';

import defaultTheme from 'src/theme';

import { ButtonPaddings, ButtonStyles } from './styles';
import { IStyledButtonProps } from './types';

const defaultFontFamily = defaultTheme.typography.button.fontFamily;
const defaultFontSize = defaultTheme.typography.button.fontSize;

const StyledButton = styled(LoadingButton)<IStyledButtonProps>(
  ({ theme, ...props }) => ({
    width: props.width,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: props.fontSize || defaultFontSize,
    fontFamily: props.fontFamily || defaultFontFamily,
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
    '&:disabled': {
      cursor: 'not-allowed',
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default StyledButton;
