import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ButtonGroup,
  Grow,
  MenuList,
  Paper,
  MenuItem,
  Popper,
  ClickAwayListener,
} from '@mui/material';

import SortIcon from 'src/assets/icons/admin/sort.svg';
import { sortOptions } from 'src/common/constants';
import { SortOrder } from 'src/redux/user/types';
import theme from 'src/theme';

import { IconButtonStyled, ButtonTitle, SortIconWrapper } from './styles';

interface ISortButton {
  title: string;
  onClick: (option: SortOrder) => void;
}

function SortButton({ title, onClick }: ISortButton) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const options = [
    { value: sortOptions.DESC as SortOrder, label: t('usersAdmin.option1') },
    { value: sortOptions.ASC as SortOrder, label: t('usersAdmin.option2') },
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotate, setRotate] = useState(false);

  const handleMenuItemClick = (
    _: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
    value: SortOrder
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    onClick(value);
    setRotate((prevRotate) => !prevRotate);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup ref={anchorRef} aria-label="sort button with menu">
        <IconButtonStyled onClick={handleToggle}>
          <ButtonTitle>{title}</ButtonTitle>
          <SortIconWrapper
            sx={{
              transform: rotate ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <SortIcon />
          </SortIconWrapper>
        </IconButtonStyled>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        sx={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            // eslint-disable-next-line react/forbid-component-props
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper sx={{ backgroundColor: theme.palette.background.default }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="sort-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.value}
                      selected={index === selectedIndex}
                      onClick={(event) =>
                        handleMenuItemClick(event, index, option.value)
                      }
                      sx={{ fontSize: '12px' }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default SortButton;
