<script lang="ts">
  import { onMount } from "svelte";
  import Card from "../components/card.svelte";
  import { showLevels } from "$lib/levelsStore";
  import Button from "../components/button.svelte";
  import book from "$lib/assets/book.svg"
  import { MoreVertical, Trash } from 'lucide-svelte';
  import DropdownMenu from "../components/dropdownMenu.svelte";

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
  }

  showLevels.set(false);
</script>


{#if sets.length !== 0}
  <h1 class="text-3xl text-primary-light mb-5 dark:text-primary-dark">Kortit</h1>
  <div class="grid grid-cols-3 gap-2.5 overflow-y-auto">
    {#each sets as set}
      <Card onClick={() => window.location.href = `/cards/${set.slug}`} className="hover:cursor-pointer">
        <div class="float-right">
          <Button variant="secondary" on:click={(e) => deleteSet(e, set.slug)}>
            <Trash/>
          </Button>
        </div>
        <h1 class="text-primary-light text-xl dark:text-primary-dark">{set.name}</h1>
        <hr class="border-primary-light my-2.5 dark:border-primary-dark"/>
        <p class="text-secondary-light dark:text-secondary-dark">{set.length} korttia • {set.learned} opittu</p>
      </Card>
    {/each}
  </div>
  {:else}
  <div class="flex justify-center items-center flex-col w-full h-full text-primary-light dark:text-primary-dark">
    <h1 class="text-xl">Ei kortteja!</h1>
    <h2 class="text-lg">Voit luoda uuden <a class="text-green-500 underline" href="/cards/create">Uusi setti</a> sivulla.</h2>
    <img src={book} alt="" class="h-96 mt-10 opacity-75">
  </div>
{/if}
