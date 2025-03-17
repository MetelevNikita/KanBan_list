import { FC } from 'react'

// types

import styles from '@/components/Board/Board.module.css'

//

import { BoardType, CardType } from '@/types/types'

// components

import Card from '@/components/Card/Card'

interface BoardProps {

  board:BoardType
  card: CardType[]

}

const Board: FC<BoardProps> = ({ board, card }) => {


  console.log(card)

  return (
    <div>

    <div  className={styles.board_box_title} style={{backgroundColor: board.colorId}}>

      <div  className={styles.board_title}>{board.title}</div>

    </div>

    <div className={styles.board_container}>

      <div className={styles.board_card_box}>
        {(!card) ? <div className={styles.board_card_loading}>Loading...</div> : card.map((item: CardType): React.ReactNode => {
          return <Card key={item.id} card={item}></Card>
        })}
      </div>

    </div>
    </div>
  )
}

export default Board
