<script lang="ts">
  import cn from "$lib/cn";
  import { createEventDispatcher } from "svelte";

  export let variant: "primary" | "secondary" = "primary";

  const dispatch = createEventDispatcher();

  const variants = {
    primary: "bg-green-700 text-stone-50 hover:bg-green-800",
    secondary: "bg-stone-800 text-stone-50 hover:bg-stone-700 border border-stone-700"
  }
</script>

<button class={cn("px-2 py-1 rounded-md pointer-events-auto", variants[variant])} on:click={() => dispatch("click")}>
  <slot/>
</button>