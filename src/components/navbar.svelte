<script lang="ts">
  import { levelsWritable, showLevels } from "$lib/levelsStore";

  let levels = [0, 0, 0, 0, 0, 0];
  let show = false;
  const levelNames = ["1", "2", "3", "4", "5", "✓"];

  levelsWritable.subscribe((value) => {
    levels = value;
  });

  showLevels.subscribe((value) => {
    show = value;
  });
</script>

<div>
  <h1 class="text-4xl text-stone-50 font-bold mb-5">Flashcards</h1>
  <ul class="text-stone-50 underline text-lg">
    <li class="hover:cursor-pointer hover:text-stone-300"><a href="/">Etusivu</a></li>
    <li class="hover:cursor-pointer hover:text-stone-300"><a href="/cards/create">Uusi setti</a></li>
  </ul>
</div>

<div class="flex justify-around">
  {#if show}
    {#each levels as level, i}
      <div class="flex flex-col items-center">
        <div class="text-stone-50 text-xl font-bold">{levelNames[i]}</div>
        <div class="text-stone-300 text-lg">{level}</div>
      </div>
    {/each}
  {/if}
</div>