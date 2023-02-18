import {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import AuthReducer, { AUTH_ACTION_TYPE } from './authReducer';

export type AuthStateType = {
  curUser: Object | null | undefined;
};

export const AUTH_INIT_STATE: AuthStateType = {
  // @ts-ignore
  curUser: JSON.parse(localStorage.getItem('user')) ?? null,
};

const useAuthContext = (initState: AuthStateType) => {
  const [state, dispatch] = useReducer(AuthReducer, initState);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.curUser));
  }, [state.curUser]);

  /* useCallback memoizes function so its not recreated
  and doesn't cause component re-render */

  const login = useCallback(
    (user: Object) => dispatch({ type: AUTH_ACTION_TYPE.LOGIN, payload: user }),
    []
  );

  const logout = useCallback(
    () => dispatch({ type: AUTH_ACTION_TYPE.LOGOUT }),
    []
  );

  return { state, login, logout };
};

type UseAuthContextType = ReturnType<typeof useAuthContext>;

const initContextState: UseAuthContextType = {
  state: AUTH_INIT_STATE,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<UseAuthContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const AuthContextProvider = ({
  children,
  ...AUTH_INIT_STATE
}: ChildrenType & AuthStateType): ReactElement => {
  return (
    <AuthContext.Provider value={useAuthContext(AUTH_INIT_STATE)}>
      {children}
    </AuthContext.Provider>
  );
};
