import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Collapse,
  IconButton,
  List,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import ChatsIcon from 'src/assets/icons/chats.svg';
import ChevronDown from 'src/assets/icons/chevron-down.svg';
import ChevronUp from 'src/assets/icons/chevron-up.svg';
import ProductsIcon from 'src/assets/icons/products.svg';
import UsersIcon from 'src/assets/icons/users.svg';
import { urls, userRoles } from 'src/common/constants';
import theme from 'src/theme';

import Logo from './Logo';
import { StyledListItemButton, StyledSubListItemButton } from './styles';

const listIndexes = {
  users: 0,
  products: 1,
  chats: 2,
};

const subListIndexes = {
  buyers: 1,
  vendors: 2,
  requests: 3,
  productsList: 4,
};

function SideBar() {
  const [selectedIndex, setSelectedIndex] = useState(listIndexes.users);
  const [selectedSubIndex, setSelectedSubIndex] = useState<number | null>(null);
  const [openUsers, setOpenUsers] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleUsersClick = () => {
    setOpenUsers(!openUsers);
  };

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setSelectedSubIndex(null);
  };

  const handleSubListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    parentIndex: number
  ) => {
    setSelectedSubIndex(index);
    setSelectedIndex(parentIndex);
  };

  return (
    <>
      <Box marginBottom="35px" height="50px" width="100%">
        <Logo logoColor="black" />
      </Box>
      <List component="nav">
        <StyledListItemButton
          selected={selectedIndex === listIndexes.users}
          onClick={(event) => {
            handleListItemClick(event, listIndexes.users);
            navigate(urls.ADMIN_USERS, {
              state: { role: undefined },
            });
          }}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            width="140px"
          >
            <ListItemIcon sx={{ minWidth: '24px' }}>
              <UsersIcon />
            </ListItemIcon>
            {selectedIndex === listIndexes.users ? (
              <Typography
                variant="subtitle1"
                sx={{ marginLeft: '12px', fontSize: '16px' }}
              >
                {t('sidebar.users')}
              </Typography>
            ) : (
              <Typography sx={{ marginLeft: '12px', fontWeight: '500' }}>
                {t('sidebar.users')}
              </Typography>
            )}
          </Box>
          {openUsers ? (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                handleUsersClick();
              }}
            >
              <ChevronUp />
            </IconButton>
          ) : (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                handleUsersClick();
              }}
            >
              <ChevronDown />
            </IconButton>
          )}
        </StyledListItemButton>

        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{
              borderLeft: `1px solid ${theme.palette.border.secondary}`,
              marginLeft: '30px',
              marginBottom: '12px',
            }}
          >
            <StyledSubListItemButton
              selected={selectedSubIndex === subListIndexes.buyers}
              onClick={(event) => {
                handleSubListItemClick(
                  event,
                  subListIndexes.buyers,
                  listIndexes.users
                );
                navigate(urls.ADMIN_BUYERS, {
                  state: { role: userRoles.BUYER },
                });
              }}
            >
              <Typography variant="h4">{t('sidebar.buyers')}</Typography>
            </StyledSubListItemButton>
            <StyledSubListItemButton
              selected={selectedSubIndex === subListIndexes.vendors}
              onClick={(event) => {
                handleSubListItemClick(
                  event,
                  subListIndexes.vendors,
                  listIndexes.users
                );
                navigate(urls.ADMIN_VENDORS, {
                  state: { role: userRoles.VENDOR },
                });
              }}
            >
              <Typography variant="h4">{t('sidebar.vendors')}</Typography>
            </StyledSubListItemButton>
          </List>
        </Collapse>

        <StyledListItemButton
          selected={selectedIndex === listIndexes.products}
          onClick={(event) => {
            handleListItemClick(event, listIndexes.products);
          }}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            width="140px"
          >
            <ListItemIcon sx={{ minWidth: '24px' }}>
              <ProductsIcon />
            </ListItemIcon>
            {selectedIndex === listIndexes.products ? (
              <Typography
                variant="subtitle1"
                sx={{ marginLeft: '12px', fontSize: '16px' }}
              >
                {t('sidebar.products')}
              </Typography>
            ) : (
              <Typography sx={{ marginLeft: '12px', fontWeight: '500' }}>
                {t('sidebar.products')}
              </Typography>
            )}
          </Box>
          {openProducts ? (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                handleProductsClick();
              }}
            >
              <ChevronUp />
            </IconButton>
          ) : (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                handleProductsClick();
              }}
            >
              <ChevronDown />
            </IconButton>
          )}
        </StyledListItemButton>

        <Collapse in={openProducts} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{
              borderLeft: `1px solid ${theme.palette.border.secondary}`,
              marginLeft: '30px',
              marginBottom: '12px',
            }}
          >
            <StyledSubListItemButton
              selected={selectedSubIndex === subListIndexes.requests}
              onClick={(event) =>
                handleSubListItemClick(
                  event,
                  subListIndexes.requests,
                  listIndexes.products
                )
              }
            >
              <Typography variant="h4">{t('sidebar.requests')}</Typography>
            </StyledSubListItemButton>
            <StyledSubListItemButton
              selected={selectedSubIndex === subListIndexes.productsList}
              onClick={(event) =>
                handleSubListItemClick(
                  event,
                  subListIndexes.productsList,
                  listIndexes.products
                )
              }
            >
              <Typography variant="h4">{t('sidebar.productsList')}</Typography>
            </StyledSubListItemButton>
          </List>
        </Collapse>

        <StyledListItemButton
          selected={selectedIndex === listIndexes.chats}
          onClick={(event) => {
            handleListItemClick(event, listIndexes.chats);
            setSelectedSubIndex(null);
          }}
        >
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            width="140px"
          >
            <ListItemIcon sx={{ minWidth: '24px' }}>
              <ChatsIcon />
            </ListItemIcon>
            {selectedIndex === listIndexes.chats ? (
              <Typography
                variant="subtitle1"
                sx={{ marginLeft: '12px', fontSize: '16px' }}
              >
                {t('sidebar.chats')}
              </Typography>
            ) : (
              <Typography sx={{ marginLeft: '12px', fontWeight: '500' }}>
                {t('sidebar.chats')}
              </Typography>
            )}
          </Box>
        </StyledListItemButton>
      </List>
    </>
  );
}

export default SideBar;
