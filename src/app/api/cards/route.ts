import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const pathDB = path.join(process.cwd(), "src/database/cards.json");
console.log(pathDB)



// db

import cards from '@/database/cards.json'

// types

import { CardType } from "@/types/types";


export const GET = (): NextResponse<{cards: CardType[]} | any>  => {
  try {

    if (!cards) {
      return NextResponse.json({ error: 'No cards found' }, { status: 404 });
    }
    return NextResponse.json({ cards: cards }, { status: 200 });

  } catch (error: Error | any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}






export const POST = async (req: NextRequest): Promise<any> => {
  try {
    const body = await req.json();


    if (!body) {
      return NextResponse.json({ error: 'No body found' }, { status: 404 });
    }

    const db = fs.writeFileSync(pathDB, JSON.stringify({cards: body}, null, 2))
    return NextResponse.json(db);

  } catch (error: Error | any) {

    return NextResponse.json({ error: error.message }, { status: 500 });

  }
}