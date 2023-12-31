<script lang="ts">
  import type { CardsProgress, FlashCard as FlashCardType } from "$lib/cards";
  import { onMount } from "svelte";
  import Card from "../../../components/card.svelte";
  import { CardsEngine } from "$lib/cardsEngine";
  import Flashcard from "../../../components/flashcard.svelte";
  import Button from "../../../components/button.svelte";
  import { activeLevel, showLevels } from "$lib/data/levelsStore";
  import Kbd from "../../../components/kbd.svelte";
  import { ChevronLeft, ChevronRight, ChevronUp, Space } from "lucide-svelte";
  import { flippedWritable } from "$lib/data/cardStore";
  import { Motion, useMotionValue, useTransform, type PanInfo } from "svelte-motion";
  import cn from "$lib/cn";

  export let data: { slug: string };
  const slug = data.slug;

  let card: FlashCardType | null = null;
  let cardLevel: number = 0;
  let error: any = null;
  let cardsEngine: CardsEngine | null = null;

  // animation
  const x = useMotionValue(0);
  const opacity = useTransform(x, (v) => 100 / Math.sqrt(v * v));
  const rotate = useTransform(x, (v) => v);
  showLevels.set(true);

  onMount(() => {
    try {
      console.log(JSON.stringify({ sets: [] }));
      const cards = JSON.parse(localStorage.getItem(`cards-${slug}`) || "[]");
      const progress: CardsProgress = JSON.parse(
        localStorage.getItem(`progress-${slug}`) || '{"sets":[], "learned": []}',
      );

      cardsEngine = new CardsEngine(cards, progress, slug);
      [card, cardLevel] = cardsEngine.getCard();
    } catch (e) {
      console.error(e);
      error = e;
    }
  });

  const updateCard = () => {
    if (cardsEngine == null) throw Error("cardsEngine is null");

    flippedWritable.set(false);
    [card, cardLevel] = cardsEngine.getCard();
    activeLevel.set(cardsEngine.currentLevel);
  };

  const onCorrect = () => {
    if (cardsEngine == null) throw Error("cardsEngine is null");

    cardsEngine.bumpCard(cardLevel);

    updateCard();
  };

  const onFail = () => {
    if (cardsEngine == null) throw Error("cardsEngine is null");

    cardsEngine.dropCard(cardLevel);

    updateCard();
  };

  const onReset = () => {
    if (cardsEngine == null) throw Error("cardsEngine is null");

    updateCard();
  };

  const onFullyLearnt = () => {
    if (cardsEngine == null) throw new Error("cardsEngine is null");

    cardsEngine.fullyLearnCard(cardLevel);

    updateCard();
  };

  const handleSwipe = (_: never, info: PanInfo) => {
    console.log("opacity");
    console.log("swipe", info.offset.x);
    if (info.offset.x > 300) {
      onCorrect();
    } else if (info.offset.x < -300) {
      onFail();
    }
  };
</script>

<section
  class={cn("w-full h-full", {
    "bg-gradient-to-r from-red-500 to-40% to-transparent": $x < -50,
    "bg-gradient-to-l from-green-500 to-40% to-transparent": $x > 50,
  })}
>
  {#if error != null}
    <div class="flex text-stone-50 justify-center items-center h-full">
      <Card>
        <h1 class="text-2xl">Error</h1>
        <p class="font-mono">{error}</p>
      </Card>
    </div>
  {:else if card}
    <Motion
      drag="x"
      dragConstraints={{ left: 10, right: 10 }}
      onDragEnd={handleSwipe}
      let:motion
      style={{ x, opacity, transform: `rotateZ(${rotate}deg)` }}
    >
      <div
        use:motion
        class="flex justify-center items-center h-full text-primary-light dark:text-primary-dark select-none"
      >
        <Flashcard>
          <div slot="front" class="flex items-center justify-center flex-col h-full">
            {card.front}
          </div>
          <div slot="back" class="flex justify-around flex-col h-full">
            <div></div>
            {card.back}
            <div class="flex gap-2.5 justify-center flex-col">
              {#if card?.index >= 0}
                <div class="flex gap-2 5 justify-center">
                  <Button variant="secondary" on:click={onFail}>En Osannut</Button>
                  <Button on:click={onCorrect}>Osasin</Button>
                </div>
              {:else}
                <Button on:click={onReset}>Aloita Alusta</Button>
              {/if}
            </div>
          </div>
        </Flashcard>
      </div>
    </Motion>

    <div
      class="absolute bottom-2.5 flex justify-center gap-5 w-[calc(75%-40px)] text-sm text-secondary-light dark:text-secondary-dark select-none"
    >
      <div class="flex flex-col items-center">
        <Kbd><Space size={10} /></Kbd> Käännä kortti
      </div>
      <div class="flex flex-col items-center">
        <Kbd><ChevronLeft size={10} /></Kbd> En osannut
      </div>
      <div class="flex flex-col items-center">
        <Kbd><ChevronUp size={10} /></Kbd> Osaan varmasti
      </div>
      <div class="flex flex-col items-center">
        <Kbd><ChevronRight size={10} /></Kbd> Osasin
      </div>
    </div>
  {:else}
    <div class="flex justify-center items-center h-full text-primary-light dark:text-primary-dark">
      <Card>
        <h1 class="text-2xl">Loading...</h1>
      </Card>
    </div>
  {/if}
</section>

<svelte:window
  on:keydown={(e) => {
    let flipped = false;

    flippedWritable.subscribe((value) => {
      flipped = value;
    });

    if (flipped) {
      if (e.key === "ArrowLeft") {
        onFail();
      } else if (e.key === "ArrowRight") {
        onCorrect();
      }
    }

    if (e.key == "ArrowUp") {
      onFullyLearnt();
    }
  }}
/>
