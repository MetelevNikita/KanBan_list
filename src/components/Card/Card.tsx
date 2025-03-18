import { FC } from 'react'
import {CSS} from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';


// css

import styles from '@/components/Card/Card.module.css'

// types

import { CardType } from '@/types/types'

interface CardProps {
  card: CardType
}

const Card: FC<CardProps> = ({ card }) => {

  // const {attributes, listeners, setNodeRef, transform} = useDraggable({id: card.id});

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: card.id});

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  };







  return (
    <div className={styles.card_container} {...attributes} {...listeners} ref={setNodeRef} style={style}>

        <div className={styles.card_theme_box}>

          <div className={styles.card_title}>{card.title}</div>
          <div className={styles.card_date_created}>{card.dateCreated}</div>

        </div>

        <div className={styles.card_description}>{card.description}</div>

        <div className={styles.card_deadline}>{card.deadline}</div>

    </div>
  )
}

export default Card



