import type { TreeViewTypes } from 'devextreme-react/tree-view';
import type { ButtonTypes } from 'devextreme-react/button';

export interface HeaderProps {
  menuToggleEnabled: boolean;
  title?: string;
  toggleMenu: (e: ButtonTypes.ClickEvent) => void;
}

export interface SideNavigationMenuProps {
  selectedItemChanged: (e: TreeViewTypes.ItemClickEvent) => void;
  openMenu: (e: React.PointerEvent) => void;
  compactMode: boolean;
  onMenuReady: (e: TreeViewTypes.ContentReadyEvent) => void;
}

export interface UserPanelProps {
  menuMode: 'context' | 'list';
}

export interface UserData {
  email: string;
  avatarUrl: string;
}

export interface AuthContextType {
  user?: UserData;
  signIn: (email: string, password: string) => Promise<{ isOk: boolean; data?: UserData; message?: string }>;
  signOut: () => void;
  loading: boolean;
}

export interface SideNavToolbarProps {
  title: string;
}

export interface SingleCardProps {
  title?: string;
  description?: string;
}

export type Handle = () => void;

interface NavigationData {
  currentPath: string;
}

export interface NavigationContextType {
  setNavigationData: ({ currentPath }: NavigationData) => void;
  navigationData: NavigationData;
}

export interface ValidationType {
  value: string;
}

export interface ThemeData {
  text: string;
  value: string;
  ImageSrc: string;
}

export interface ThemeContextType {
  setTheme: (theme: string) => void;
  getThemeData: () => ThemeData[];
  getTheme: () => string;
}

export type ThemeSwatchAccent = 'light' | 'dark';
