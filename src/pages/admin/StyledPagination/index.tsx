import PaginationStyled from './styles';

interface IStyledPagination {
  count?: number;

  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function StyledPagination({ count, handleChange }: IStyledPagination) {
  return (
    <PaginationStyled count={count} shape="rounded" onChange={handleChange} />
  );
}

export default StyledPagination;
