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
import theme from 'src/theme';

import { IconButtonStyled, ButtonTitle, SortIconWrapper } from './styles';

interface ISortButton {
  title: string;
  onClick: (option: string) => void;
}

function SortButton({ title, onClick }: ISortButton) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const options = [t('usersAdmin.option1'), t('usersAdmin.option2')];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotate, setRotate] = useState(false);

  const handleMenuItemClick = (
    _: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
    onClick(options[index]);
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
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                      sx={{ fontSize: '12px' }}
                    >
                      {option}
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
