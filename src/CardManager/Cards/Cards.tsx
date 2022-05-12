import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, fetchCreditCardList } from '../CreditCard';
import CreditCardBox from '../../components/Card/Card';
import Row from 'react-bootstrap/Row';
import { Button, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function Cards() {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState<CreditCard[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const cards: CreditCard[] = await fetchCreditCardList();
    setCardsData(cards);
  }

  return (
    <>
      <h1 className='home-page-heading'>Ваши карты</h1>
      <Container>
        <Row className='justify-content-center'>
          {cardsData.length === 0 && (
            <>
              <Card style={{ width: '50%', margin: '25px' }}>
                <Card.Body>
                  <Card.Title>Вы не создали карту</Card.Title>
                  <Card.Subtitle className='mb-2 text-muted'>
                    Перейдите во вкладку "Добавить карту"
                  </Card.Subtitle>
                  <Card.Text>
                    Вы можете добавлять, редактировать, удалять карты в любое
                    время
                  </Card.Text>
                  <Card.Link href='/add-card'>Добавить карту</Card.Link>
                </Card.Body>
              </Card>
            </>
          )}
          {cardsData.map((card: CreditCard, id) => (
            <Col md={4} key={id} className='mb-3'>
              <Link
                key={id}
                to={`cards/${card.id}/edit`}
                className='col-md-3 credit-card'
              >
                <CreditCardBox
                  cardNumber={card.cardNumber}
                  cardHolder={card.cardHolder}
                  cardMonth={card.cardMonth}
                  cardYear={card.cardYear}
                  cardCvv={card.cardCvv}
                  isCardFlipped={false}
                ></CreditCardBox>
              </Link>
            </Col>
          ))}
        </Row>
        <Row className='justify-content-center'>
          <Col md={4} className='mt-3'>
            <Button
              className='add-new-card'
              variant='primary'
              size='lg'
              onClick={() => navigate('add-card')}
            >
              Добавить новую карту
            </Button>{' '}
          </Col>
        </Row>
      </Container>
    </>
  );
}
