import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import type { NavigationContextType } from '../types';

const NavigationContext = createContext<NavigationContextType>({
  navigationData: { currentPath: '' },
  setNavigationData: () => {},
});

function useNavigation(): NavigationContextType {
  return useContext(NavigationContext);
}

function NavigationProvider(props: React.PropsWithChildren<{}>): JSX.Element {
  const [navigationData, setNavigationData] = useState({ currentPath: '' });

  const navigationValue = useMemo<NavigationContextType>(() => ({
    navigationData,
    setNavigationData,
  }), [navigationData, setNavigationData]);

  return (
    <NavigationContext.Provider
      value={navigationValue}
      {...props}
    />
  );
}

function withNavigationWatcher(Component: React.ComponentType<any>, path: string): React.ReactNode {
  function WrappedComponent(props: React.PropsWithChildren<{}>): JSX.Element {
    const { setNavigationData } = useNavigation();

    useEffect(() => {
      setNavigationData({ currentPath: path });
    }, [path, setNavigationData]);

    return <Component {...props} />;
  }
  return <WrappedComponent />;
}

export {
  NavigationProvider,
  useNavigation,
  withNavigationWatcher,
};
