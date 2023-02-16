import { ReactElement, useCallback, useContext } from 'react';
import { createContext, useReducer } from 'react';
import DarkModeReducer, { REDUCER_ACTION_TYPE } from './darkModeReducer';

export type StateType = {
  darkMode: boolean;
};

export const INITIAL_STATE: StateType = {
  darkMode: false,
};

const useDarkModeContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(DarkModeReducer, initState);

  /* useCallback memoizes function so its not recreated
  and doesn't cause component re-render */

  const lightModeOn = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.LIGHT }),
    []
  );
  const darkModeOn = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.DARK }),
    []
  );
  const toggleModes = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.TOGGLE }),
    []
  );

  return { state, lightModeOn, darkModeOn, toggleModes };
};

type UseDarkModeContextType = ReturnType<typeof useDarkModeContext>;

const initContextState: UseDarkModeContextType = {
  state: INITIAL_STATE,
  lightModeOn: () => {},
  darkModeOn: () => {},
  toggleModes: () => {},
};

export const DarkModeContext =
  createContext<UseDarkModeContextType>(initContextState);

type UseDarkModeHookType = {
  darkMode: boolean;
  lightModeOn: () => void;
  darkModeOn: () => void;
  toggleModes: () => void;
};

export const useDarkMode = (): UseDarkModeHookType => {
  const {
    state: { darkMode },
    lightModeOn,
    darkModeOn,
    toggleModes,
  } = useContext(DarkModeContext);
  return { darkMode, lightModeOn, darkModeOn, toggleModes };
};

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const DarkModeContextProvider = ({
  children,
  ...INITIAL_STATE
}: ChildrenType & StateType): ReactElement => {
  return (
    <DarkModeContext.Provider value={useDarkModeContext(INITIAL_STATE)}>
      {children}
    </DarkModeContext.Provider>
  );
};
