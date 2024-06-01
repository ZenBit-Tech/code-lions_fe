import { ReactNode } from 'react';
import { Box, styled } from '@mui/system';

interface TitleInputWrapperProps {
  children: ReactNode;
}

const TitleInputWrapperStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '8px',
});

function TitleInputWrapper({ children }: TitleInputWrapperProps): JSX.Element {
  return <TitleInputWrapperStyled>{children}</TitleInputWrapperStyled>;
}

export default TitleInputWrapper;