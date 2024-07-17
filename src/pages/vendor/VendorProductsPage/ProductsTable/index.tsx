import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Table, TableContainer, TableRow, Typography } from '@mui/material';

import formatToTwoDecimalPlaces from 'src/common/utils/formatToTwoDecimalPlaces';
import ProductTableCard from 'src/components/ProductTableCard';
import StyledBackdrop from 'src/components/shared/StyledBackdrop';
import StyledPagination from 'src/pages/admin/StyledPagination';
import { IProduct } from 'src/redux/product/types';

import ActionButtons from '../ActionButtons';
import ModalPopup from '../ModalPopup';

import {
  BodyTableCell,
  TableBodyStyled,
  TableCellStyled,
  TableHeadStyled,
  TableRowStyled,
  Status,
} from './styles';

interface IProductsTable {
  products: IProduct[];
  pagesCount: number;
  page: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function ProductsTable({
  products,
  pagesCount,
  page,
  handleChange,
}: IProductsTable) {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const handleOpen = (userId: string) => {
    setShowModal(true);
    setSelectedUser(userId);
  };
  const handleClose = () => setShowModal(false);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeadStyled>
          <TableRowStyled>
            <TableCellStyled align="left">
              <Typography variant="subtitle1">
                {t('vendorProductList.product')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="center">
              <Typography variant="subtitle1">
                {t('vendorProductList.category')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="center">
              <Typography variant="subtitle1">
                {t('vendorProductList.status')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="center">
              <Typography variant="subtitle1">
                {t('vendorProductList.stock')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="center">
              <Typography variant="subtitle1">
                {t('vendorProductList.price')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="center">
              <Typography variant="subtitle1">
                {t('vendorProductList.action')}
              </Typography>
            </TableCellStyled>
          </TableRowStyled>
        </TableHeadStyled>
        <TableBodyStyled>
          {products.map((product) => (
            <TableRow key={product.id}>
              <BodyTableCell component="th" scope="row" align="left">
                <ProductTableCard
                  images={product.images}
                  size={product.size}
                  name={product.name}
                />
              </BodyTableCell>
              <BodyTableCell align="center">
                {product.categories.length > 1 &&
                  product.categories.map((category) => (
                    <Typography
                      key={category}
                      sx={{ textTransform: 'capitalize', marginBottom: '4px' }}
                    >
                      {category || ''}
                    </Typography>
                  ))}
              </BodyTableCell>
              <BodyTableCell align="center">
                <Status label={product.status} status={product.status} />
              </BodyTableCell>
              <BodyTableCell align="center">1</BodyTableCell>
              <BodyTableCell align="center">
                ${formatToTwoDecimalPlaces(product.price)}
              </BodyTableCell>
              <BodyTableCell align="center">
                <ActionButtons
                  productId={product.id}
                  handleOpen={() => handleOpen(product.id)}
                />
              </BodyTableCell>
              {showModal &&
                product.id === selectedUser &&
                createPortal(
                  <StyledBackdrop showModal={showModal}>
                    <ModalPopup onClose={handleClose} productId={product.id} />
                  </StyledBackdrop>,
                  document.body
                )}
            </TableRow>
          ))}
        </TableBodyStyled>
      </Table>
      <StyledPagination
        count={pagesCount}
        page={page}
        handleChange={handleChange}
      />
    </TableContainer>
  );
}

export default ProductsTable;
