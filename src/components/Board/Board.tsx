import { FC } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useDroppable } from '@dnd-kit/core'


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



  const { setNodeRef } = useDroppable({
    id: board.boardId,
    data: {
      type: board.title,
    }
  })



  return (


    <div ref={setNodeRef} className={styles.board_container_box}>

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
