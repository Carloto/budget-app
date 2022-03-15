import { createContext, useContext } from 'react';
import { User } from '../services';

export interface IAuthContext {
  user: User;
  onLogout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: {
    name: '',
    email: '',
  },
  onLogout: () => {},
});

export function useAuthContext() {
  return useContext(AuthContext);
}
