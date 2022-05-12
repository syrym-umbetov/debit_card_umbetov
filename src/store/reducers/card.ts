import { Reducer } from 'redux';
import { SET_ERRORS, HANDLE_FORM_CHANGE } from '../actions/cardActions';

const initState = {
  errors: {
    id: '',
    cardNumber: '',
    cardHolder: '',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
  },
};

export const card: Reducer = (state = initState, action: any) => {
  switch (action.type) {
    case SET_ERRORS:
      return { ...state, errors: action.payload };
    case HANDLE_FORM_CHANGE:
      return { ...state };
    default:
      return state;
  }
};
