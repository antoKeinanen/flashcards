<script lang="ts">
  import cn from "$lib/cn";
  import { notificationWritable } from "$lib/notificationStore";
  import Button from "./button.svelte";

  export let variant: "success" | "warning" | "error";
  export let title: string;
  export let message: string;
  export let show: boolean = true;

  const variants = {
    success: "border-l-green-500",
    warning: "border-l-yellow-500",
    error: "border-l-red-500"
  }

  const close = () => {
    notificationWritable.update((value) => ({...value, visible: false}))
  }
</script>

<div class={cn("flex items-center gap-10 bg-stone-900 px-10 py-5 rounded-md border border-stone-700 border-l-4 invisible", variants[variant], { "visible": show})}>
  <div>
    <h1 class="text-stone-50 text-2xl font-bold">{title}</h1>
    <p class="text-stone-100 text-lg">{message}</p>
  </div>
  <div>
    <Button on:click={close} variant="secondary">X</Button>
  </div>
</div>