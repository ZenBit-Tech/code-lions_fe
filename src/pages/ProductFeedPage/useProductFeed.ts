import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { skipToken } from '@reduxjs/toolkit/query';
import { urls, productsOnPage } from 'src/common/constants';
import createNavigationLink from 'src/common/utils/createNavigationLink';
import { SortParameter, SortOrder } from 'src/components/shared/OrderSelector';
import { useGetProductsQuery } from 'src/redux/product/productService';
import { IProductFilters, IProductResponse } from 'src/redux/product/types';

interface UseProductFeedReturn {
  methods: ReturnType<typeof useForm>;
  category?: string;
  searchQuery?: string;
  filters: IProductFilters;
  sortBy?: SortParameter;
  sortOrder?: SortOrder;
  data?: IProductResponse;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  page: number;
  handleSearchChange: (searchTerm: string) => void;
  handlePageChange: (_: React.ChangeEvent<unknown>, pageNumber: number) => void;
  handleFiltersChange: (currentFilters: IProductFilters) => void;
  handleResetFilter: (key: keyof IProductFilters) => void;
  handleResetAllFilters: () => void;
  handleSortChange: (
    newSortBy?: SortParameter,
    newSortOrder?: SortOrder
  ) => void;
}

function useProductFeed(): UseProductFeedReturn {
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm();

  const queryParams: URLSearchParams = new URLSearchParams(location.search);
  const pageParam: string | null = queryParams.get('page');
  const page: number = pageParam ? parseInt(pageParam, 10) : 1;
  const search: string | undefined =
    queryParams.get('search')?.trim() || undefined;

  const [searchQuery, setSearchQuery] = useState<string | undefined>(search);
  const [filters, setFilters] = useState<IProductFilters>({});
  const [sortBy, setSortBy] = useState<SortParameter | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>(undefined);

  const { category } = useParams<{ category?: string }>();

  let baseUrl = category
    ? `${urls.PRODUCT_CATEGORY_URL}/${category}`
    : urls.PRODUCT_FEED;

  if (location.pathname === urls.BEST_VENDORS) {
    baseUrl = urls.BEST_VENDORS;
  }

  const handleSearchChange = (searchTerm: string) => {
    const requestParams: Record<string, string> = { search: searchTerm };
    const link = createNavigationLink(baseUrl, requestParams);

    setSearchQuery(searchTerm);

    navigate(link);
  };

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    const requestParams: Record<string, string> = { page: String(pageNumber) };

    if (searchQuery) {
      requestParams.search = searchQuery;
    }
    const link = createNavigationLink(baseUrl, requestParams);

    navigate(link);
  };

  const handleFiltersChange = (currentFilters: IProductFilters) => {
    const requestParams: Record<string, string> = {};

    if (searchQuery) {
      requestParams.search = searchQuery;
    }
    const link = createNavigationLink(baseUrl, requestParams);

    setFilters(currentFilters);

    navigate(link);
  };

  const handleResetFilter = (key: keyof IProductFilters) => {
    const newFilters = { ...filters };

    delete newFilters[key];
    setFilters(newFilters);
  };

  const handleResetAllFilters = () => {
    setFilters({});
  };

  const handleSortChange = (
    newSortBy?: SortParameter,
    newSortOrder?: SortOrder
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const shouldFetch = location.pathname !== urls.BEST_VENDORS;

  const { data, isLoading, isFetching, isError } = useGetProductsQuery(
    shouldFetch
      ? {
          category,
          page,
          limit: productsOnPage,
          search,
          filters,
          sortBy,
          sortOrder,
        }
      : skipToken
  );

  useEffect(() => {
    setSearchQuery(search);
    methods.setValue('search', search);
  }, [search, methods]);

  return {
    methods,
    category,
    searchQuery,
    filters,
    sortBy,
    sortOrder,
    data,
    isLoading,
    isFetching,
    isError,
    page,
    handleSearchChange,
    handlePageChange,
    handleFiltersChange,
    handleResetFilter,
    handleResetAllFilters,
    handleSortChange,
  };
}

export default useProductFeed;
