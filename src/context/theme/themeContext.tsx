import {
  createContext,
  useCallback,
  useReducer,
  ReactElement,
  useEffect,
} from 'react';
import ThemeReducer, { REDUCER_ACTION_TYPE } from './themeReducer';

export type ThemeStateType = {
  theme: string;
};

export const INIT_STATE: ThemeStateType = {
  // @ts-ignore
  theme: JSON.parse(localStorage.getItem('themeColor')) ?? 'light',
};

const useThemeContext = (initState: ThemeStateType) => {
  const [state, dispatch] = useReducer(ThemeReducer, INIT_STATE);

  useEffect(() => {
    localStorage.setItem('themeColor', JSON.stringify(state.theme));
  }, [state.theme]);

  /* useCallback memoizes functions so they are not re-created
  and cause component to re-render */

  const lightThemeOn = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.LIGHT }),
    []
  );

  const darkThemeOn = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.DARK }),
    []
  );

  const blueThemeOn = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.BLUE }),
    []
  );

  return { state, lightThemeOn, darkThemeOn, blueThemeOn };
};

type UseThemeContextType = ReturnType<typeof useThemeContext>;

const initContextState: UseThemeContextType = {
  state: INIT_STATE,
  lightThemeOn: () => {},
  darkThemeOn: () => {},
  blueThemeOn: () => {},
};

export const ThemeContext =
  createContext<UseThemeContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const ThemeContextProvider = ({
  children,
  ...INIT_STATE
}: ChildrenType & ThemeStateType): ReactElement => {
  return (
    <ThemeContext.Provider value={useThemeContext(INIT_STATE)}>
      {children}
    </ThemeContext.Provider>
  );
};
