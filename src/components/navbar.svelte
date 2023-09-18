<script lang="ts">
  import cn from "$lib/cn";
  import { activeLevel, levelsWritable, showLevels } from "$lib/levelsStore";

  let levels = [0, 0, 0, 0, 0, 0];
  let show = false;
  const levelNames = ["1", "2", "3", "4", "5", "✓"];
  let active = 0;

  levelsWritable.subscribe((value) => {
    levels = value;
  });

  showLevels.subscribe((value) => {
    show = value;
  });

  activeLevel.subscribe((value) => {
    active = value;
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
        <div class={cn("text-stone-50 text-xl font-bold", {"text-green-500": i==active})}>{levelNames[i]}</div>
        <div class={cn("text-stone-300 text-lg", {"text-green-500": i==active})}>{level}</div>
      </div>
    {/each}
  {/if}
</div>