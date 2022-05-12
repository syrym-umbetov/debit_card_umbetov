import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { CreditCard } from '../../CardManager/CreditCard';
import { monthsArr, yearsArr } from './constants';
import { useAppSelector, useAppDispatch } from './../../hooks/useTypedSelector';

import { SET_ERRORS } from './../../store/actions/cardActions';

interface CardFormProps {
  selectedCreditCard: CreditCard;
  onUpdateState: any;
  setIsCardFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitAction: () => void;
  children: any;
}
export default function CardForm(props: CardFormProps) {
  const errors = useAppSelector((state) => state.card.errors);
  const dispatch = useAppDispatch();

  const {
    selectedCreditCard,
    onUpdateState,
    setIsCardFlipped,
    handleSubmitAction,
    children,
  } = props;

  const handleFormChange = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;

    onUpdateState(name, value);
  };

  const handleFormChangeNumbers = (event: {
    target: { value: string; name: string };
  }) => {
    const { name, value } = event.target;
    if (isNaN(Number(value))) return;
    onUpdateState(name, value);
  };

  const onCvvFocus = () => {
    setIsCardFlipped(true);
  };

  const onCvvBlur = () => {
    setIsCardFlipped(false);
  };

  const handleConfirmAction = (e: any) => {
    // validate errors
    if (!isFormHasErrors()) {
      handleSubmitAction();
    }
  };
  const isFormHasErrors = () => {
    const newErrors: CreditCard = {
      id: '',
      cardNumber: '',
      cardHolder: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
    };
    //first validate blank fields
    let isErrorFlag = false;

    Object.keys(newErrors).forEach(function (key: any) {
      const keyPair = key as keyof CreditCard;

      let displayableKeyName;
      switch (key) {
        case 'cardNumber':
          displayableKeyName = key
            .toLowerCase()
            .replace('cardnumber', 'Поле номер карты ');
          break;
        case 'cardHolder':
          displayableKeyName = key
            .toLowerCase()
            .replace('cardholder', 'Имя держателя карты ');
          break;
        case 'cardMonth':
          displayableKeyName = key
            .toLowerCase()
            .replace('cardmonth', 'Поле месяц ');
          break;
        case 'cardYear':
          displayableKeyName = key
            .toLowerCase()
            .replace('cardyear', 'Поле год ');
          break;
        case 'cardCvv':
          displayableKeyName = key
            .toLowerCase()
            .replace('cardcvv', 'Поле CVV ');
          break;
        default:
          break;
      }
      if (!selectedCreditCard[keyPair]) {
        newErrors[keyPair] = `${displayableKeyName} обязательно.`;

        isErrorFlag = true;
      } else {
        newErrors[keyPair] = '';
        isErrorFlag = false;
      }
    });
    if (isErrorFlag) {
      dispatch({ type: SET_ERRORS, payload: newErrors });
      return isErrorFlag;
    }

    if (selectedCreditCard['cardNumber'].length !== 16) {
      newErrors.cardNumber = 'Введите 16-значное число';
      isErrorFlag = true;
    }
    if (selectedCreditCard['cardCvv'].length !== 3) {
      newErrors.cardCvv = 'CVV номер должен состоять из 3 цифр';
      isErrorFlag = true;
    }
    dispatch({ type: SET_ERRORS, payload: newErrors });
    return isErrorFlag;
  };

  return (
    <div className='card-form'>
      <div className='card-list'>{children}</div>
      <div className='card-form__inner'>
        <div className='card-input'>
          <label htmlFor='cardNumber' className='card-input__label'>
            Номер Карты
          </label>
          <Form.Control
            type='text'
            name='cardNumber'
            className='card-input__input'
            autoComplete='off'
            onChange={handleFormChangeNumbers}
            maxLength={16}
            value={selectedCreditCard.cardNumber}
            isInvalid={!!errors.cardNumber}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.cardNumber}
          </Form.Control.Feedback>
        </div>

        <div className='card-input'>
          <label htmlFor='cardName' className='card-input__label'>
            Имя держателя карты
          </label>
          <Form.Control
            type='text'
            className='card-input__input'
            autoComplete='off'
            name='cardHolder'
            onChange={handleFormChange}
            value={selectedCreditCard.cardHolder}
            isInvalid={!!errors.cardHolder}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.cardHolder}
          </Form.Control.Feedback>
        </div>

        <div className='card-form__row'>
          <div className='card-form__col'>
            <div className='card-form__group'>
              <label htmlFor='cardMonth' className='card-input__label'>
                Дата истечения
              </label>
              <Form.Control
                as='select'
                className='card-input__input -select'
                value={selectedCreditCard.cardMonth}
                name='cardMonth'
                onChange={handleFormChange}
                isInvalid={!!errors.cardMonth}
              >
                <option value='' disabled>
                  Месяц
                </option>

                {monthsArr.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.cardMonth}
              </Form.Control.Feedback>
              <Form.Control
                as='select'
                name='cardYear'
                className='card-input__input -select'
                value={selectedCreditCard.cardYear}
                onChange={handleFormChange}
                isInvalid={!!errors.cardYear}
              >
                <option value='' disabled>
                  Год
                </option>

                {yearsArr.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.cardYear}
              </Form.Control.Feedback>
            </div>
          </div>
          <div className='card-form__col -cvv'>
            <div className='card-input'>
              <label htmlFor='cardCvv' className='card-input__label'>
                CVV
              </label>
              <Form.Control
                type='text'
                className='card-input__input'
                maxLength={3}
                autoComplete='off'
                name='cardCvv'
                value={selectedCreditCard.cardCvv}
                onChange={handleFormChangeNumbers}
                onFocus={onCvvFocus}
                onBlur={onCvvBlur}
                isInvalid={!!errors.cardCvv}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.cardCvv}
              </Form.Control.Feedback>
            </div>
          </div>
        </div>
        <div className='card-form__row'>
          <div className='card-form__col'>
            <div className='d-grid gap-2'>
              <Button variant='primary' size='lg' onClick={handleConfirmAction}>
                Оплатить
              </Button>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
