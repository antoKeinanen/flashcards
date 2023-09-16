export type Cards = {
  name: string;
  uuid: string;
  cards: FlashCard[];
}

export type FlashCard = {
  index: number;
  front: string;
  back: string;
}

export type CardsProgress = {
  sets: number[][];
  learned: number[];
}