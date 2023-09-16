import type { Cards, CardsProgress, FlashCard } from "./cards";
import { levelsWritable } from "./levelsStore";

export class CardsEngine {
  cards!: Cards;
  progress!: CardsProgress;
  slug!: string;
  currentLevel = 0;

  shuffleCards<T>(array: T[]): T[] {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  constructor(cards: Cards, progress: CardsProgress, slug: string) {
    this.progress = progress;
    this.cards = cards;
    this.slug = slug;

    if (progress.sets.length != 5) {
      this.progress.sets = [[], [], [], [], []];
      this.cards.cards = this.shuffleCards(cards.cards);

      this.cards.cards.forEach((card) => {
        this.progress.sets[0].push(card.index);
      });
    }

    this.updateLevels();
  }

  findCard(cardIndex: number) {
    return this.cards.cards.find((card) => card.index == cardIndex);
  }

  updateLevels() {
    const levels: number[] = this.progress.sets.map((set) => set.length);
    levels.push(this.progress.learned.length);
    levelsWritable.update(() => levels);

    this.saveProgress();
  }

  saveProgress() {
    const data: CardsProgress = {
      sets: this.progress.sets,
      learned: this.progress.learned,
    };

    console.log("saving", data);

    localStorage.setItem(`progress-${this.slug}`, JSON.stringify(data));
  }

  getCard(): [FlashCard, number] {
    if (this.progress.sets.flat().length == 0)
      return [{ front: "Onnittelut", back: "Suoritit kaikki kortit!", index: -1 }, 0];

    let cardsInLevel = this.progress.sets[this.currentLevel];
    while (cardsInLevel.length == 0) {
      this.currentLevel = this.currentLevel + 1 % 5;
      cardsInLevel = this.progress.sets[this.currentLevel];
    }

    const card = this.findCard(cardsInLevel[0]);

    if (card == undefined) throw new Error("Card not found");

    return [card, this.currentLevel];
  }

  bumpCard(level: number) {
    const cardIndex = this.progress.sets[level].shift();
    if (cardIndex == undefined) throw new Error("Card not found");

    if (level == 4) {
      this.progress.learned.push(cardIndex);
      this.updateLevels();
      return;
    }
    this.progress.sets[level + 1].push(cardIndex);

    this.updateLevels();
  }

  dropCard(level: number) {
    const cardIndex = this.progress.sets[level].shift();
    if (cardIndex == undefined) throw new Error("Card not found");

    this.progress.sets[0].push(cardIndex);

    this.updateLevels();
  }

  reset() {
    this.progress.sets = [[], [], [], [], []];
    this.progress.learned = [];
    this.cards.cards = this.shuffleCards(this.cards.cards);

    this.cards.cards.forEach((card) => {
      this.progress.sets[0].push(card.index);
    });

    this.updateLevels();
  }
}
