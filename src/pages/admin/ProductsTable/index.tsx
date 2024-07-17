import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { Table, TableContainer, TableRow, Typography } from '@mui/material';

import { urls } from 'src/common/constants';
import formatToTwoDecimalPlaces from 'src/common/utils/formatToTwoDecimalPlaces';
import ProductTableCard from 'src/components/ProductTableCard';
import StyledBackdrop from 'src/components/shared/StyledBackdrop';
import StyledPagination from 'src/pages/admin/StyledPagination';
import { IProduct } from 'src/redux/product/types';

import ActionButtonsProduct from '../ProductListPage/ActionButtonsProduct';
import ModalPopupProduct from '../ProductListPage/ModalPopupProduct';
import ActionButtonsRequest from '../ProductRequestPage/ActionButtonsRequest';
import ModalPopupReject from '../ProductRequestPage/ModalPopupReject';

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
  const location = useLocation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const handleOpen = (productId: string) => {
    setShowModal(true);
    setSelectedProduct(productId);
  };
  const handleClose = () => setShowModal(false);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeadStyled>
          <TableRowStyled>
            <TableCellStyled align="left">
              <Typography variant="subtitle1">
                {t('productsAdmin.product')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="center">
              <Typography variant="subtitle1">
                {t('productsAdmin.category')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="center">
              <Typography variant="subtitle1">
                {t('productsAdmin.status')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="center">
              <Typography variant="subtitle1">
                {t('productsAdmin.quantity')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="center">
              <Typography variant="subtitle1">
                {t('productsAdmin.price')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="center">
              <Typography variant="subtitle1">
                {t('productsAdmin.action')}
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
                {product?.categories &&
                  product.categories.length >= 1 &&
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
              <BodyTableCell align="center">{product.stock ?? 1}</BodyTableCell>
              <BodyTableCell align="center">
                ${formatToTwoDecimalPlaces(product.price)}
              </BodyTableCell>
              <BodyTableCell align="center">
                {location.pathname.includes(urls.ADMIN_PRODUCT_REQUEST) && (
                  <ActionButtonsRequest
                    productId={product.id}
                    handleOpen={() => handleOpen(product.id)}
                  />
                )}
                {location.pathname.includes(urls.ADMIN_PRODUCT_LIST) && (
                  <ActionButtonsProduct
                    productId={product.id}
                    handleOpen={() => handleOpen(product.id)}
                  />
                )}
              </BodyTableCell>
              {location.pathname.includes(urls.ADMIN_PRODUCT_REQUEST) &&
                showModal &&
                product.id === selectedProduct &&
                createPortal(
                  <StyledBackdrop showModal={showModal}>
                    <ModalPopupReject
                      onClose={handleClose}
                      productId={product.id}
                    />
                  </StyledBackdrop>,
                  document.body
                )}
              {location.pathname.includes(urls.ADMIN_PRODUCT_LIST) &&
                showModal &&
                product.id === selectedProduct &&
                createPortal(
                  <StyledBackdrop showModal={showModal}>
                    <ModalPopupProduct
                      onClose={handleClose}
                      productId={product.id}
                    />
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
