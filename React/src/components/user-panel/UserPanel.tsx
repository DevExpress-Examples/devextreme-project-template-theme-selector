import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextMenu, {
  Position,
  My,
  At,
  type ContextMenuTypes,
} from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import { useAuth } from '../../contexts/auth';
import './UserPanel.scss';

interface UserPanelProps {
  menuMode?: 'context' | 'list';
}

export default function UserPanel({ menuMode }: UserPanelProps): JSX.Element {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function navigateToProfile(): void {
    navigate('/profile')?.catch(() => {});
  }

  const menuItems = useMemo<ContextMenuTypes.Item[]>(() => [
    {
      text: 'Profile',
      icon: 'user',
      onClick: navigateToProfile,
    },
    {
      text: 'Logout',
      icon: 'runner',
      onClick: signOut,
    },
  ], [navigateToProfile, signOut]);

  return (
    <div className='user-panel'>
      <div className='user-info'>
        <div className='image-container'>
          <div
            style={{
              background: `url(${user?.avatarUrl}) no-repeat #fff`,
              backgroundSize: 'cover',
            }}
            className='user-image' />
        </div>
        <div className='user-name dx-theme-text-color'>{user?.email}</div>
      </div>

      {menuMode === 'context' && (
        <ContextMenu
          items={menuItems}
          target='.user-button'
          showEvent='dxclick'
          width={210}
          cssClass='user-menu'
        >
          <Position>
            <My x='center' y='top' />
            <At x='center' y='bottom' />
          </Position>
        </ContextMenu>
      )}
      {menuMode === 'list' && (
        <List className='dx-toolbar-menu-action' items={menuItems} />
      )}
    </div>
  );
}
