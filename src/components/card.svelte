<script lang="ts">
  import cn from "$lib/cn";

  export let className = "";
  export let onClick: () => void = () => {};

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick();
    }
  }
</script>

<div role="link" tabindex={0} on:keydown={onKeyDown} on:click={onClick} class={cn("p-5 rounded-lg border border-primary-light bg-secondary-light dark:border-primary-dark dark:bg-secondary-dark", className)}>
  <slot/> 
</div>