import { SET_FORM_DATA } from '../actionType';

const formDReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      state = action.value;
      return state;
    default:
      return { ...state };
  }
};

export default formDReducer;
