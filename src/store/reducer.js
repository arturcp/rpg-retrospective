import * as actionTypes from './actions';

const initialState = {
  userName: '',
  data: {
    type: '',
    character: {},
  },
  iceBreaker: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_NAME:
      return {
        ...state,
        data: {
          ...state.data
        },
        userName: action.name,
        iceBraker: { ...state.iceBreaker },
      };
    case actionTypes.SAVE_CHARACTER:
      return {
        ...state,
        data: {
          ...state.data,
          type: action.characterType,
          character: action.character,
        },
        iceBraker: { ...state.iceBreaker },
      };
    case actionTypes.SAVE_CHARACTER_NAME:
      return {
        ...state,
        data: {
          ...state.data,
          character: {
            ...state.data.character,
            name: action.name
          }
        },
        iceBraker: { ...state.iceBreaker },
      };
    case actionTypes.SAVE_ICE_BREAKER_INFORMATION:
      return {
        ...state,
        data: {
          ...state.data
        },
        iceBreaker: {
          theme: action.theme,
          option1: action.option1,
          option2: action.option2,
          option3: action.option3,
          option4: action.option4,
        }
      };
    default:
      return state;
  }
}

export default reducer;
