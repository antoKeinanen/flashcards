<script lang="ts">
  import type { Cards, FlashCard } from "$lib/cards";
  import { v4 as uuid } from "uuid";
  import Card from "$lib/../components/card.svelte";
  import { showLevels } from "$lib/levelsStore";
  import { notificationWritable } from "$lib/notificationStore";

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

<form class="max-w-5xl p-5" on:submit={onSubmit}>
  <label for="name" class="text-stone-50">Setin nimi</label>
  <input bind:value={name} type="text" id="name" class="block w-96 bg-stone-900 border border-stone-700 focus:ring-green-500 focus:ring-2 rounded-md text-stone-100 p-2.5 mb-2.5">
  <div class="flex gap-5">
    <div>
      <label for="sides" class="text-stone-50">Puolien välissä</label>
      <input bind:value={side_separator} type="text" id="sides" class="block w-28 bg-stone-900 border border-stone-700 focus:ring-green-500 focus:ring-2 rounded-md text-stone-100 p-2.5 mb-2.5">
    </div>
    <div>
      <label for="cards" class="text-stone-50">Korttien välissä</label>
      <input bind:value={card_separator} type="text" id="cards" class="block w-28 bg-stone-900 border border-stone-700 focus:ring-green-500 focus:ring-2 rounded-md text-stone-100 p-2.5 mb-2.5">
    </div>
  </div>
  <label for="name" class="text-stone-50">Setin kortit</label>
  <textarea bind:value={set} id="set" placeholder="" class="block w-full bg-stone-900 border border-stone-700 focus:ring-green-500 focus:ring-2 rounded-md text-stone-100 p-2.5 mb-2.5"/>
  <input type="submit" value="Tallenna" class="bg-green-500 text-stone-50 rounded-md px-2 py-1 text-lg">
</form>
<div class="p-5">
  {#if parsed_set.length > 0}
  <h1 class="text-stone-50 text-2xl mb-5">Esikatselu</h1>
  <div class="grid grid-cols-2 gap-2.5">
    {#each parsed_set as card}
      <Card>
        <h1 class="text-stone-50 text-lg">{card.front}</h1> 
        <hr class="border-stone-700"/>
        <p class="text-stone-100">{card.back}</p>
      </Card>
    {/each}
  </div>
  {/if}
</div>
