import { ReactNode } from 'react';
import SimpleSectionStyled from './styles';

interface ISimpleSection {
  children: ReactNode;
}

function SimpleSection({ children }: ISimpleSection) {
  return (
    <SimpleSectionStyled component="section">{children}</SimpleSectionStyled>
  );
}

export default SimpleSection;
