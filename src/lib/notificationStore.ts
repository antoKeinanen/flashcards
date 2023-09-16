import { writable } from "svelte/store";

export type NotificationData = {
  title: string;
  message: string;
  visible: boolean;
  variant: "success" | "error" | "warning";
};

export const notificationWritable = writable<NotificationData>({
  message: "",
  title: "",
  visible: false,
  variant: "success",
});
