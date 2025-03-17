'use client'

import { FC, useEffect, useState } from 'react'

// css

import styles from '@/app/main/page.module.css'

import { Container, Row, Col } from 'react-bootstrap'


// components

import Board from '@/components/Board/Board'

// types

import { BoardType, CardType } from '@/types/types'

const Main: FC = () => {


  const [cards, setCards] = useState<{cards: CardType[]}>({cards: []})

  useEffect(() => {getCards()}, [])

  const getCards = async (): Promise<{cards: CardType[], error: string} | unknown> => {
      try {

        const responce = await fetch("http://localhost:3000/api/cards");
        const data = await responce.json();
        setCards(data.cards)
        return data


      } catch (error: Error | unknown) {
        console.log(error);
        return error;

      }
  }

  const boardArr: BoardType[] = [
    {
      id: 1,
      title: "Входящие",
      boardId: 'inbox',
      colorId: "#48F2C7"
    },

    {
      id: 2,
      title: "Согласовано",
      boardId: 'agreed',
      colorId: "#FFDC5D"
    },

    {
      id: 3,
      title: "Отклонено",
      boardId: 'rejected',
      colorId: "#f24848"
    },

    {
      id: 4,
      title: "Согласовано с замечаниями",
      boardId: 'notes',
      colorId: "#F9795D"
    },
  ]


  return (

    <Container fluid>

      <Row className='mb-5 mt-5'>
        <Col className="d-flex flex-row align-items-center justify-content-start">
          <div className={styles.main_title}>MAIN PAGE</div>
        </Col>
      </Row>



      <Row>

        <Col className="d-flex flex-row align-items-start justify-content-center">


            {boardArr.map((board: BoardType): React.ReactNode => {
              return <Col className="d-flex flex-row align-items-center justify-content-center" md={3} key={board.id}><Board board={board} card={cards.cards.filter((item) => {return item.status === board.boardId})}/></Col>
            })}


        </Col>

      </Row>

    </Container>
  )
}

export default Main
