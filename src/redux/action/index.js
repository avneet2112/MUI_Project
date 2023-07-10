import { SET_FORM_DATA } from '../actionType';

export const setFormDataReducer = (value) => ({
  type: SET_FORM_DATA,
  value: value,
});
