import { ReactNode } from 'react';
import { Box, styled } from '@mui/system';

interface InputWrapperProps {
  children: ReactNode;
}

const InputWrapperStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '8px',
});

function InputWrapper({ children }: InputWrapperProps): JSX.Element {
  return <InputWrapperStyled>{children}</InputWrapperStyled>;
}

export default InputWrapper;
