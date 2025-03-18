'use client'

import { FC, useEffect, useState } from 'react'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, UniqueIdentifier, closestCorners, KeyboardSensor, MouseSensor, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core'

// css

import styles from '@/app/main/page.module.css'

import { Container, Row, Col } from 'react-bootstrap'


// components

import Board from '@/components/Board/Board'
import Card from '@/components/Card/Card'


// types

import { BoardType, CardType } from '@/types/types'
import { arrayMove } from '@dnd-kit/sortable'

const Main: FC = () => {


  const [card, setCard] = useState<CardType[]>([])
  const [activeCardId, setActiveCardId] = useState<UniqueIdentifier | null>(null)


  useEffect(() => {getCards()}, [])

  const getCards = async (): Promise<CardType[] | unknown> => {
      try {

        const responce = await fetch("http://localhost:3000/api/cards");
        const data = await responce.json();

        setCard(data.cards.cards)

      } catch (error: Error | unknown) {
        console.log(error);
        return error;

      }
  }



  const postCard = async (cardData: CardType[]) => {
    try {

      const responce = await fetch('http://localhost:3000/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData)
      })

      const data = await responce.json();
      return data;

    } catch (error) {

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

  // DND

  const sensor = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
    useSensor(PointerSensor)
  )


  const handleDragStart = (event: DragStartEvent): void => {
    setActiveCardId(event.active.id)
  }


  const handleDragMove = (event: DragStartEvent): void => {

  }


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if(!over) return

    setCard((items: any | CardType[]) => {
      const oldIndex = items.findIndex((item: any) => item.id === active.id)
      const newIndex = items.findIndex((item: any) => item.id === over.id)

      let updateCards: any

      if (typeof over.id == 'string') {
        updateCards = card.map((item: any) => item.id === Number(active.id) ? {...item, status: over.id} : item)



      } else {
        updateCards = arrayMove(items, oldIndex, newIndex)

      }

      postCard(updateCards)
      return updateCards

    })


  }


  const activeCard = card.find((item: CardType) => item.id === activeCardId)




  return (

    <Container fluid>

      <Row className='mb-5 mt-5'>
        <Col className="d-flex flex-row align-items-center justify-content-start">
          <div className={styles.main_title}>TROLLOLLO</div>
        </Col>
      </Row>



      <Row>
        <Col className="d-flex flex-row align-items-start justify-content-center">
            <DndContext sensors={sensor} onDragStart={handleDragStart} onDragMove={handleDragMove} onDragEnd={handleDragEnd}>


                    {boardArr.map((board: BoardType): React.ReactNode => {
                      return <Col className="d-flex flex-row align-items-center justify-content-center" md={3} key={board.id}><Board board={board} card={card.filter((item: any) => {return item.status === board.boardId})}/></Col>
                    })}


                    <DragOverlay dropAnimation={{ duration: 50, easing: 'cubic-bezier(0.18, 0.6, 0.3, 1)' }}>
                      {activeCard ? <Card card={activeCard}></Card> : <div style={{background: 'red'}}></div>}
                    </DragOverlay>


            </DndContext>
        </Col>
      </Row>

    </Container>
  )
}

export default Main
