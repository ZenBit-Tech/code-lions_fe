import { ReactNode } from 'react';
import SectionStyled from './styles';

interface SectionProps {
  children: ReactNode;
}

function Section({ children }: SectionProps): JSX.Element {
  return <SectionStyled component="section">{children}</SectionStyled>;
}

export default Section;
