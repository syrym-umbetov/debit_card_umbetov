export const cardBackgroundName = () => {
  return `${'credit_card_bg'}.jpeg`;
};

export const CARDS = {
  kaspi: '^440043',
  jusan: '^535650',
  sberbank: '^426343',
  mastercard: '^5[1-5]',
  visa: '^4',
  discover: '^6011',
  unionpay: '^62',
};

export const BACKGROUND_IMG = cardBackgroundName();

export interface CardProp {
  cardHolder: string;
  cardNumber: string;
  cardMonth: any;
  cardYear: any;
  cardCvv: string;
  isCardFlipped: boolean;
}
