import Button from 'devextreme-react/button';
import Drawer from 'devextreme-react/drawer';
import ScrollView, { type ScrollViewRef } from 'devextreme-react/scroll-view';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import type { ButtonTypes } from 'devextreme-react/button';
import type { TreeViewTypes } from 'devextreme-react/tree-view';
import { Template } from 'devextreme-react/core/template';
import React, {
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, SideNavigationMenu, Footer } from '../../components';
import './side-nav-inner-toolbar.scss';
import { useScreenSize } from '../../utils/media-query';
import { useMenuPatch } from '../../utils/patches';
import type { SideNavToolbarProps } from '../../types';

const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3,
};

export default function SideNavInnerToolbar({ title, children }: React.PropsWithChildren<SideNavToolbarProps>): JSX.Element {
  const scrollViewRef = useRef<ScrollViewRef>(null);
  const navigate = useNavigate();
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState(
    isLarge ? MenuStatus.Opened : MenuStatus.Closed,
  );

  const toggleMenu = useCallback(({ event }: ButtonTypes.ClickEvent) => {
    setMenuStatus(
      (prevMenuStatus) => (prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.Opened
        : MenuStatus.Closed),
    );
    event?.stopPropagation();
  }, []);

  const temporaryOpenMenu = useCallback(() => {
    setMenuStatus(
      (prevMenuStatus) => (prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.TemporaryOpened
        : prevMenuStatus),
    );
  }, []);

  const onOutsideClick = useCallback(() => {
    setMenuStatus(
      (prevMenuStatus) => (prevMenuStatus !== MenuStatus.Closed && !isLarge
        ? MenuStatus.Closed
        : prevMenuStatus),
    );
    return true;
  }, [isLarge]);

  const onNavigationChanged = useCallback(({ itemData, event, node }: TreeViewTypes.ItemClickEvent) => {
    if (menuStatus === MenuStatus.Closed || !itemData?.path || node?.selected) {
      event?.preventDefault();
      return;
    }

    navigate(itemData.path)?.catch(() => {});
    scrollViewRef.current?.instance().scrollTo(0);

    if (!isLarge || menuStatus === MenuStatus.TemporaryOpened) {
      setMenuStatus(MenuStatus.Closed);
      event?.stopPropagation();
    }
  }, [navigate, menuStatus, isLarge]);

  return (
    <div className='side-nav-inner-toolbar'>
      <Drawer
        className={['drawer', patchCssClass].join(' ')}
        position='before'
        closeOnOutsideClick={onOutsideClick}
        openedStateMode={isLarge ? 'shrink' : 'overlap'}
        revealMode={isXSmall ? 'slide' : 'expand'}
        minSize={isXSmall ? 0 : 60}
        maxSize={250}
        shading={!isLarge}
        opened={menuStatus !== MenuStatus.Closed}
        template='menu'
      >
        <div className='container'>
          <Header
            menuToggleEnabled={isXSmall}
            toggleMenu={toggleMenu}
          />
          <ScrollView ref={scrollViewRef} className='layout-body with-footer'>
            <div className='content'>
              {React.Children.map(children, (item: ReactNode) => {
                if (React.isValidElement(item) && item.type !== Footer) {
                  return item;
                }
                return null;
              })}
            </div>
            <div className='content-block'>
              {React.Children.map(children, (item: ReactNode) => {
                if (React.isValidElement(item) && item.type === Footer) {
                  return item;
                }
                return null;
              })}
            </div>
          </ScrollView>
        </div>
        <Template name='menu'>
          <SideNavigationMenu
            compactMode={menuStatus === MenuStatus.Closed}
            selectedItemChanged={onNavigationChanged}
            openMenu={temporaryOpenMenu}
            onMenuReady={onMenuReady}
          >
            <Toolbar id='navigation-header'>
              {
                !isXSmall
                && <Item
                  location='before'
                  cssClass='menu-button'
                >
                  <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
                </Item>
              }
              <Item location='before' cssClass='header-title' text={title} />
            </Toolbar>
          </SideNavigationMenu>
        </Template>
      </Drawer>
    </div>
  );
}

