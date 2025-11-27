import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import TreeView, { type TreeViewRef } from 'devextreme-react/tree-view';
import * as events from 'devextreme/events';
import { navigation } from '../../app-navigation';
import { useNavigation } from '../../contexts/navigation';
import { useScreenSize } from '../../utils/media-query';
import './SideNavigationMenu.scss';

interface SideNavigationMenuProps {
  children?: React.ReactNode;
  selectedItemChanged?: (e: any) => void;
  openMenu?: (e: any) => void;
  compactMode?: boolean;
  onMenuReady?: (e: any) => void;
}

interface TreeViewItem {
  [key: string]: any;
  path?: string;
  expanded?: boolean;
}

export default function SideNavigationMenu(props: SideNavigationMenuProps): JSX.Element {
  const {
    children,
    selectedItemChanged,
    openMenu,
    compactMode,
    onMenuReady,
  } = props;

  const { isLarge } = useScreenSize();
  function normalizePath(): TreeViewItem[] {
    return navigation.map((item) => (
      { ...item, expanded: isLarge, path: item.path && !item.path.startsWith('/') ? `/${item.path}` : item.path }
    ));
  }

  const items = useMemo(normalizePath, []);

  const { navigationData: { currentPath } } = useNavigation();

  const treeViewRef = useRef<TreeViewRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const getWrapperRef = useCallback((element: HTMLDivElement) => {
    const prevElement = wrapperRef.current;
    if (prevElement) {
      events.off(prevElement, 'dxclick');
    }

    (wrapperRef as React.MutableRefObject<HTMLDivElement>).current = element;
    events.on(element, 'dxclick', (e: any) => {
      openMenu?.(e);
    });
  }, [openMenu]);

  useEffect(() => {
    const treeView = treeViewRef.current?.instance();
    if (!treeView) {
      return;
    }

    if (currentPath !== undefined) {
      treeView.selectItem(currentPath);
      treeView.expandItem(currentPath).catch(() => {});
    }

    if (compactMode) {
      treeView.collapseAll();
    }
  }, [currentPath, compactMode]);

  return (
    <div
      className='dx-swatch-additional side-navigation-menu'
      ref={getWrapperRef}
    >
      {children}
      <div className='menu-container'>
        <TreeView
          ref={treeViewRef}
          items={items}
          keyExpr='path'
          selectionMode='single'
          focusStateEnabled={false}
          expandEvent='click'
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width='100%'
        />
      </div>
    </div>
  );
}
