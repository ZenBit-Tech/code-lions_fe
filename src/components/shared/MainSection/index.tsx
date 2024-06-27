import { ReactNode } from 'react';

import SectionStyled from './styles';

interface IMainSection {
  children: ReactNode;
}

function MainSection({ children }: IMainSection) {
  return <SectionStyled component="section">{children}</SectionStyled>;
}

export default MainSection;
