<script lang="ts">
  import { notificationWritable, type NotificationData } from "$lib/notificationStore";
  import "../app.css";
  import Navbar from "../components/navbar.svelte";
  import Notification from "../components/notification.svelte";


  let notificationData: NotificationData;
  notificationWritable.subscribe((value) => {
    notificationData = value;
  })
</script>

<section class="flex">
  <nav class="w-1/4 bg-stone-900 p-5 border-r border-stone-700 flex justify-between flex-col">
    <Navbar />
  </nav>
  <main class="min-h-screen bg-stone-800 p-5 w-3/4">
    <slot />
  </main>
</section>

<div class="absolute right-2.5 bottom-2.5">
  <Notification variant={notificationData.variant} title={notificationData.title} message={notificationData.message} show={notificationData.visible} />
</div>