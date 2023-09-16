<script lang="ts">
  import { onMount } from "svelte";
  import Card from "../components/card.svelte";
  import { showLevels } from "$lib/levelsStore";
  import Button from "../components/button.svelte";
  import book from "$lib/assets/book.svg"

  let sets: { name: string; length: number, slug: string, learned: number }[] = [];

  onMount(() => {
    const uuids = JSON.parse(localStorage.getItem("uuids") || "[]");
    uuids.forEach((uuid: string) => {
      const set = JSON.parse(localStorage.getItem(`cards-${uuid}`) || "{}");
      const {learned} = JSON.parse(localStorage.getItem(`progress-${uuid}`) || "{\"sets\":[], \"learned\": []}");
      sets = [...sets, { name: set.name, length: set.cards.length, slug: uuid, learned: learned.length }]
    });
  });

  const deleteSet = (e: Event, deleteSlug: string) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (!confirm("Haluatko varmasti poistaa tämän setin?")) return;
    const uuids = JSON.parse(localStorage.getItem("uuids") || "[]");
    const index = uuids.indexOf(deleteSlug);
    uuids.splice(index, 1);
    localStorage.removeItem(`cards-${deleteSlug}`);
    localStorage.removeItem(`progress-${deleteSlug}`);
    localStorage.setItem("uuids", JSON.stringify(uuids));
    sets = sets.filter((set) => set.slug !== deleteSlug);
    window.location.replace("/");
  }

  showLevels.set(false);
</script>


{#if sets.length !== 0}
<h1 class="text-3xl text-white mb-5">Kortit</h1>
<div class="grid grid-cols-3 gap-2.5 overflow-y-auto">
  {#each sets as set}
  <a href={`/cards/${set.slug}`}>
    <Card>
      <div class="float-right">
        <Button on:click={(e) => {deleteSet(e, set.slug)}} variant="secondary">X</Button>
      </div>
      <h1 class="text-stone-50 text-xl">{set.name}</h1>
      <hr class="border-stone-700 my-2.5"/>
      <p class="text-stone-200">{set.length} korttia • {set.learned} opittu</p>
    </Card>
  </a>
  {/each}
</div>
{:else}
<div class="flex justify-center items-center flex-col w-full h-full text-stone-50">
  <h1 class="text-xl">Ei kortteja!</h1>
  <h2 class="text-lg">Voit luoda uuden <a class="text-green-500 underline" href="/cards/create">Uusi setti</a> sivulla.</h2>
  <img src={book} alt="" class="h-96 mt-10 opacity-75">
</div>
{/if}
