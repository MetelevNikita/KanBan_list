import { FC } from 'react'

// css

import styles from '@/components/Card/Card.module.css'

// types

import { CardType } from '@/types/types'

interface CardProps {
  card: CardType
}

const Card: FC<CardProps> = ({ card }) => {


  console.log(card)


  return (
    <div className={styles.card_container}>

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
