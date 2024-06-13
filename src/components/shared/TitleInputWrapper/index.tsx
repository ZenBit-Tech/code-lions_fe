import { ReactNode } from 'react';
import { Box, styled } from '@mui/system';

interface TitleInputWrapperProps {
  mb?: string;
  children: ReactNode;
}

const TitleInputWrapperStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '8px',
});

function TitleInputWrapper({
  mb,
  children,
}: TitleInputWrapperProps): JSX.Element {
  return <TitleInputWrapperStyled mb={mb}>{children}</TitleInputWrapperStyled>;
}

export default TitleInputWrapper;
