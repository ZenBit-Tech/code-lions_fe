import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Collapse,
  IconButton,
  List,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import UsersIcon from 'src/assets/icons/users.svg';
import ProductsIcon from 'src/assets/icons/products.svg';
import ChatsIcon from 'src/assets/icons/chats.svg';
import ArrowUp from 'src/assets/icons/arrow-up.svg';
import ArrowDown from 'src/assets/icons/arrow-down.svg';
import theme from 'src/theme';
import Logo from './Logo';
import { StyledListItemButton, StyledSubListItemButton } from './styles';

const listUsers: number = 0;
const listProducts: number = 1;
const listChats: number = 2;

const subListBuyers: number = 1;
const subListVendors: number = 2;
const subListRequests: number = 3;
const subListProducts: number = 4;

function SideBar() {
  const [selectedIndex, setSelectedIndex] = useState(listUsers);
  const [selectedSubIndex, setSelectedSubIndex] = useState<number | null>(null);
  const [openUsers, setOpenUsers] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  const { t } = useTranslation();

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
          selected={selectedIndex === listUsers}
          onClick={(event) => {
            handleListItemClick(event, listUsers);
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
            {selectedIndex === listUsers ? (
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
            <IconButton onClick={handleUsersClick}>
              <ArrowUp />
            </IconButton>
          ) : (
            <IconButton onClick={handleUsersClick}>
              <ArrowDown />
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
              selected={selectedSubIndex === subListBuyers}
              onClick={(event) =>
                handleSubListItemClick(event, subListBuyers, listUsers)
              }
            >
              <Typography variant="h4">{t('sidebar.buyers')}</Typography>
            </StyledSubListItemButton>
            <StyledSubListItemButton
              selected={selectedSubIndex === subListVendors}
              onClick={(event) =>
                handleSubListItemClick(event, subListVendors, listUsers)
              }
            >
              <Typography variant="h4">{t('sidebar.vendors')}</Typography>
            </StyledSubListItemButton>
          </List>
        </Collapse>

        <StyledListItemButton
          selected={selectedIndex === listProducts}
          onClick={(event) => {
            handleListItemClick(event, listProducts);
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
            {selectedIndex === listProducts ? (
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
            <IconButton onClick={handleProductsClick}>
              <ArrowUp />
            </IconButton>
          ) : (
            <IconButton onClick={handleProductsClick}>
              <ArrowDown />
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
              selected={selectedSubIndex === subListRequests}
              onClick={(event) =>
                handleSubListItemClick(event, subListRequests, listProducts)
              }
            >
              <Typography variant="h4">{t('sidebar.requests')}</Typography>
            </StyledSubListItemButton>
            <StyledSubListItemButton
              selected={selectedSubIndex === subListProducts}
              onClick={(event) =>
                handleSubListItemClick(event, subListProducts, listProducts)
              }
            >
              <Typography variant="h4">{t('sidebar.productsList')}</Typography>
            </StyledSubListItemButton>
          </List>
        </Collapse>

        <StyledListItemButton
          selected={selectedIndex === listChats}
          onClick={(event) => {
            handleListItemClick(event, listChats);
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
            {selectedIndex === listChats ? (
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
