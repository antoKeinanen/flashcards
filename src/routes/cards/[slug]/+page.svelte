<script lang="ts">
  import type { CardsProgress, FlashCard as FlashCardType } from "$lib/cards";
  import { onMount } from "svelte";
  import Card from "../../../components/card.svelte";
  import { CardsEngine } from "$lib/cardsEngine";
  import Flashcard from "../../../components/flashcard.svelte";
  import Button from "../../../components/button.svelte";
  import { activeLevel, showLevels } from "$lib/levelsStore";

  export let data: { slug: string; };
  const slug = data.slug;

  let card: FlashCardType | null = null;
  let cardLevel: number = 0;
  let error: any = null;
  let cardsEngine: CardsEngine | null = null;

  showLevels.set(true);
  
  onMount(() => {
    try {
      console.log(JSON.stringify({sets: []}))
      const cards = JSON.parse(localStorage.getItem(`cards-${slug}`) || "[]");
      const progress:CardsProgress = JSON.parse(localStorage.getItem(`progress-${slug}`) || "{\"sets\":[], \"learned\": []}");

      cardsEngine = new CardsEngine(cards, progress, slug);
      [card, cardLevel] = cardsEngine.getCard();
    } catch (e) {
      console.error(e);
      error = e;
    }
  });  

  const onCorrect = () => {
    if (cardsEngine == null) throw Error("cardsEngine is null");
    
    cardsEngine.bumpCard(cardLevel);
    [card, cardLevel] = cardsEngine.getCard();
    activeLevel.set(cardsEngine.currentLevel);
  }

  const onFail = () => {
    if (cardsEngine == null) throw Error("cardsEngine is null");
    
    cardsEngine.dropCard(cardLevel);
    [card, cardLevel] = cardsEngine.getCard();
    activeLevel.set(cardsEngine.currentLevel);

  }

  const onReset = () => {
    if (cardsEngine == null) throw Error("cardsEngine is null");
    
    cardsEngine.reset();
    [card, cardLevel] = cardsEngine.getCard();
    activeLevel.set(cardsEngine.currentLevel);
  }
</script>

{#if error != null}
  <div class="bg-stone-800 flex text-stone-50 justify-center items-center h-full">
    <Card>
      <h1 class="text-2xl">Error</h1>
      <p class="font-mono">{error}</p>
    </Card>
  </div>

{:else if card}
  <div class="bg-stone-800 flex text-stone-50 justify-center items-center h-full">
    <Flashcard>
      <div slot="front" class="flex items-center justify-center h-full">
        {card.front}
      </div>
      <div slot="back" class="flex justify-around flex-col h-full">
        <div></div>

        {card.back}

        <div class="flex gap-2.5 justify-center"> 
          {#if card?.index >= 0}
            <Button on:click={onCorrect}>Osasin</Button>
            <Button variant="secondary" on:click={onFail}>En Osannut</Button>
          {:else}
            <Button on:click={onReset}>Aloita Alusta</Button>
          {/if}
        </div>
      </div>
    </Flashcard>
  </div>

{:else}
  <div class="bg-stone-800 flex text-stone-50 justify-center items-center h-full">
    <Card>
      <h1 class="text-2xl">Loading...</h1>
    </Card>
  </div>

{/if}

