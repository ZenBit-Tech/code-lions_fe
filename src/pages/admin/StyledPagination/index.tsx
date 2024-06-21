import PaginationStyled from './styles';

interface IStyledPagination {
  count?: number;
  page?: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function StyledPagination({ count, page, handleChange }: IStyledPagination) {
  return (
    <PaginationStyled
      count={count}
      shape="rounded"
      onChange={handleChange}
      page={page}
    />
  );
}

export default StyledPagination;
