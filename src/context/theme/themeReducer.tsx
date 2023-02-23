import { ThemeStateType } from './themeContext';

export const enum REDUCER_ACTION_TYPE {
  LIGHT,
  DARK,
  BLUE,
}

export type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
};

const ThemeReducer = (
  state: ThemeStateType,
  action: ReducerAction
): ThemeStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.LIGHT:
      return {
        theme: 'light',
      };
    case REDUCER_ACTION_TYPE.DARK:
      return {
        theme: 'dark',
      };
    case REDUCER_ACTION_TYPE.BLUE:
      return {
        theme: 'blue',
      };
    default:
      throw new Error();
  }
};

export default ThemeReducer;
