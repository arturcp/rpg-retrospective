import * as actionTypes from './actions';

const initialState = {
  userName: '',
  character: {
    name: '',
    class: '',
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_NAME:
      return {
        ...state,
        charcter: {
          ...state.character
        },
        userName: action.name
      };
    case actionTypes.SAVE_CHARACTER:
      return {

      };
    default:
      return state;
  }
}

export default reducer;
