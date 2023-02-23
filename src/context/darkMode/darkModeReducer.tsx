import { StateType } from './darkModeContext';

export const enum REDUCER_ACTION_TYPE {
  LIGHT,
  DARK,
  TOGGLE,
}

export type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
};

const DarkModeReducer = (
  state: StateType,
  action: ReducerAction
): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.LIGHT:
      return {
        darkMode: false,
      };
    case REDUCER_ACTION_TYPE.DARK:
      return {
        darkMode: true,
      };
    case REDUCER_ACTION_TYPE.TOGGLE:
      return {
        darkMode: !state.darkMode,
      };

    default:
      throw new Error();
  }
};

export default DarkModeReducer;
