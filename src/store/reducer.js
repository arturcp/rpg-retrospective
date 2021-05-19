import * as actionTypes from './actions';

const initialState = {
  userName: '',
  data: {
    name: '',
    type: '',
    character: {},
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_NAME:
      return {
        ...state,
        data: {
          ...state.data
        },
        userName: action.name
      };
    case actionTypes.SAVE_CHARACTER:
      return {
        ...state,
        data: {
          ...state.data,
          type: action.type,
          character: action.character
        },
      };
    case actionTypes.SAVE_CHARACTER_NAME:
      return {
        ...state,
        data: {
          ...state.data,
          name: action.name
        }
      };
    default:
      return state;
  }
}

export default reducer;
