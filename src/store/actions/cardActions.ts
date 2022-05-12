import { CreditCard } from '../../CardManager/CreditCard';

export const SET_ERRORS = 'card/errors';
export const HANDLE_FORM_CHANGE = 'card/handle-form-change';

export interface CardFormProps {
  selectedCreditCard: CreditCard;
  onUpdateState: any;
  setIsCardFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitAction: () => void;
  children: any;
}

export const setErrors = (newErrors: CreditCard) => (dispatch: any) => {
  dispatch({ type: SET_ERRORS, payload: newErrors });
};
