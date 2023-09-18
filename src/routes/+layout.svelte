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
  <nav class="w-1/4 p-5 border-r flex justify-between flex-col bg-secondary-light border-primary-light dark:bg-secondary-dark dark:border-primary-dark">
    <Navbar />
  </nav>
  <main class="min-h-screen bg-primary-light p-5 w-3/4 dark:bg-primary-dark">
    <slot />
  </main>
</section>

<div class="absolute right-2.5 bottom-2.5">
  <Notification variant={notificationData.variant} title={notificationData.title} message={notificationData.message} show={notificationData.visible} />
</div>