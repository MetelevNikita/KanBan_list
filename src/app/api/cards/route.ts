import { NextResponse } from "next/server";


// db

import cards from '@/database/cards.json'

// types

import { CardType } from "@/types/types";


export const GET = (): NextResponse<CardType[] | Error>  => {
  try {

    if (!cards) {
      return NextResponse.json({ error: 'No cards found' }, { status: 404 });
    }
    return NextResponse.json({ cards: cards }, { status: 200 });

  } catch (error: Error | any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}