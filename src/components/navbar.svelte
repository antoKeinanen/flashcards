<script lang="ts">
  import cn from "$lib/cn";
  import { activeLevel, levelsWritable, showLevels } from "$lib/data/levelsStore";

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
  <h1 class="text-4xl text-primary-light font-bold mb-5 dark:text-primary-dark">Flashcards</h1>
  <ul class="text-primary-light underline text-lg dark:text-primary-dark">
    <li class="w-fit hover:cursor-pointer hover:text-secondary-light hover:dark:text-secondary-dark"><a href="/">Etusivu</a></li>
    <li class="w-fit hover:cursor-pointer hover:text-secondary-light hover:dark:text-secondary-dark"><a href="/cards/create">Uusi setti</a></li>
  </ul>
</div>

<div class="flex justify-around">
  {#if show}
    {#each levels as level, i}
      <div class="flex flex-col items-center">
        <div class={cn("text-primary-light text-xl font-bold dark:text-primary-dark", {"text-green-500 dark:text-green-500": i==active})}>{levelNames[i]}</div>
        <div class={cn("text-secondary-light text-lg dark:text-secondary-dark", {"text-green-500 dark:text-green-500": i==active})}>{level}</div>
      </div>
    {/each}
  {/if}
</div>