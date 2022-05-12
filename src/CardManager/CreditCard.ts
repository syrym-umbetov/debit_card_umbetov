export interface CreditCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  cardMonth: string;
  cardYear: string;
  cardCvv: string;
}
export interface AddEditCard extends CreditCard {
  isCardFlipped: boolean;
}

export class CreditCardAPI {
  async fetchCreditCardList(): Promise<CreditCard[]> {
    const apiData: CreditCard[] = [
      {
        id: 'ff646567-484e-4eb7-961f-977f7c728eb9',
        cardNumber: '5356502031100920',
        cardHolder: 'Syrym Umbetov',
        cardMonth: '01',
        cardYear: '2023',
        cardCvv: '123',
      },
      {
        id: 'ff646567-484e-4eb7-921f-977f7c728eb9',
        cardNumber: '4400431234353456',
        cardHolder: 'Kaspi Bank',
        cardMonth: '01',
        cardYear: '2023',
        cardCvv: '123',
      },
      {
        id: 'ff646567-484e-4eb7-961f-977f7c729eb9',
        cardNumber: '4102312334534121',
        cardHolder: 'Visa',
        cardMonth: '01',
        cardYear: '2023',
        cardCvv: '123',
      },
    ];
    let creditCardsList: CreditCard[] = [];

    if (localStorage.getItem('cards')) {
      const localStorageData: CreditCard[] = JSON.parse(
        localStorage.getItem('cards') ?? ''
      );
      creditCardsList = [...localStorageData];
    } else {
      creditCardsList = [...apiData];
      updateLocalStorageCards(creditCardsList);
    }

    return creditCardsList;
  }
}

export async function fetchCreditCardList(): Promise<CreditCard[]> {
  const api = new CreditCardAPI();
  return api.fetchCreditCardList();
}
export function updateLocalStorageCards(cards: CreditCard[]) {
  localStorage.setItem('cards', JSON.stringify(cards));
}
