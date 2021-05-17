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
        character: {
          ...state.character
        },
        userName: action.name
      };
    case actionTypes.SAVE_CHARACTER:
      return {
        ...state,
        character: {
          ...state.character,
          class: action.character
        },
      };
    case actionTypes.SAVE_CHARACTER_NAME:
      return {
        ...state,
        character: {
          ...state.character,
          name: state.characterName
        }
      };
    default:
      return state;
  }
}

export default reducer;
