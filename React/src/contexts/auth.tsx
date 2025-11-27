import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { getUser, signIn as sendSignInRequest, type AuthResponse } from '../api/auth';
import type { UserData, AuthContextType } from '../types';

function AuthProvider(props: React.PropsWithChildren<{}>): JSX.Element {
  const [user, setUser] = useState<UserData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((authResponse: AuthResponse) => {
      if (authResponse.isOk) {
        setUser(authResponse.data);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await sendSignInRequest(email, password);
    if (result.isOk) {
      setUser(result.data);
    }
    return result;
  }, []);

  const signOut = useCallback(() => {
    setUser(undefined);
  }, []);

  const contextValue = useMemo<AuthContextType>(() => ({
    user,
    signIn,
    signOut,
    loading,
  }), [user, signIn, signOut, loading]);

  return (
    <AuthContext.Provider value={contextValue} {...props} />
  );
}

const AuthContext = createContext<AuthContextType>({
  loading: false,
  signIn: () => Promise.resolve({ isOk: false }),
  signOut: () => {},
});

function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
