<script lang="ts">
  import cn from "$lib/cn";
  import { createEventDispatcher } from "svelte";

  export let variant: "primary" | "secondary" = "primary";
  export let kind: "button" | "submit" | "reset" = "button";

  const dispatch = createEventDispatcher();

  const variants = {
    primary: "bg-green-500 text-primary-dark hover:bg-green-400 dark:bg-green-700 dark:hover:bg-green-800",
    secondary: "bg-primary-light text-primary-light hover:bg-secondary-light border border-primary-light dark:bg-primary-dark dark:text-primary-dark dark:hover:bg-secondary-dark dark:border-primary-dark"
  }
</script>

<button type={kind} class={cn("px-2 py-1 rounded-md pointer-events-auto transition-color duration-200", variants[variant])} on:click|capture={() => dispatch("click")}>
  <slot/>
</button>