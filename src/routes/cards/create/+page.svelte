<script lang="ts">
  import type { Cards, FlashCard } from "$lib/cards";
  import { v4 as uuid } from "uuid";
  import Card from "$lib/../components/card.svelte";
  import { showLevels } from "$lib/data/levelsStore";
  import { notificationWritable } from "$lib/data/notificationStore";
  import Button from "../../../components/button.svelte";

  let name = ""
  let set = "";
  let side_separator = "\\t";
  let card_separator = "\\n";
  
  const escape_map: {[key:string]: string} = {
    "\\t": "\t",
    "\\n": "\n",
  }

  $: escaped_side_separator = escape_map[side_separator] || side_separator;
  $: escaped_card_separator = escape_map[card_separator] || card_separator;
  $: parsed_set = set.split(escaped_card_separator).map((card: string, index: number) : FlashCard => {const sides= card.split(escaped_side_separator); return {front: sides[0] || "Error", back: sides[1] || "Error", index}});

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (!name || !set || !parsed_set) {
      notificationWritable.set({
        visible: true,
        variant: "error",
        title: "Täytä kaikki tiedot.",
        message: "Nimi tai kortit puuttuu!"
      });
      return;
    }

    const id = uuid();
    const uuids = JSON.parse(localStorage.getItem("uuids") || "[]");

    if (uuids.includes(id)) {
      notificationWritable.set({
        visible: true,
        variant: "error",
        title: "Uuid on jo olemassa.",
        message: "Todennäköisyys tälle on 1 / 2^(122)!"
      });
      return;
    }

    const cards: Cards = {
      name,
      uuid: id,
      cards: parsed_set
    }

    uuids.push(cards.uuid);
    localStorage.setItem(`cards-${cards.uuid}`, JSON.stringify(cards));
    localStorage.setItem("uuids", JSON.stringify(uuids));

    notificationWritable.set({
      visible: true,
      variant: "success",
      title: "Setti luotu!",
      message: "Setti on nyt luotu ja voit aloittaa opiskelun."
    });
  }

  showLevels.set(false);
</script>

<form class="max-w-5xl p-5 text-primary-light dark:text-primary-dark" on:submit={onSubmit}>
  <label for="name" class="">Setin nimi</label>
  <input bind:value={name} type="text" id="name" class="block w-96 p-2.5 mb-2.5 rounded-md bg-secondary-light text-primary-light border border-primary-light dark:bg-secondary-dark dark:text-primary-dark dark:border-primary-dark">
  <div class="flex gap-5">
    <div>
      <label for="sides">Puolien välissä</label>
      <input bind:value={side_separator} type="text" id="sides" class="block w-28 p-2.5 mb-2.5 rounded-md bg-secondary-light text-primary-light border border-primary-light dark:bg-secondary-dark dark:text-primary-dark dark:border-primary-dark">
    </div>
    <div>
      <label for="cards">Korttien välissä</label>
      <input bind:value={card_separator} type="text" id="cards" class="block w-28 p-2.5 mb-2.5 rounded-md bg-secondary-light text-primary-light border border-primary-light dark:bg-secondary-dark dark:text-primary-dark dark:border-primary-dark">
    </div>
  </div>
  <label for="name">Setin kortit</label>
  <textarea bind:value={set} id="set" placeholder="" class="block w-full p-2.5 mb-2.5 rounded-md bg-secondary-light text-primary-light border border-primary-light dark:bg-secondary-dark dark:text-primary-dark dark:border-primary-dark"/>
  <Button kind="submit">Luo setti</Button>
</form>
<div class="p-5 text-primary-light dark:text-primary-dark">
  {#if parsed_set.length > 0}
  <h1 class="text-2xl mb-5">Esikatselu</h1>
  <div class="grid grid-cols-2 gap-2.5">
    {#each parsed_set as card}
      <Card>
        <h1 class="text-lg">{card.front}</h1> 
        <hr class="border-primary-light dark:border-primary-dark mt-1 mb-2.5"/>
        <p class="text-secondary-light dark:text-secondary-dark">{card.back}</p>
      </Card>
    {/each}
  </div>
  {/if}
</div>
