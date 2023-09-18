import { writable } from "svelte/store";

export const levelsWritable = writable([0, 0, 0, 0, 0, 0]);
export const showLevels = writable(false);
export const activeLevel = writable(0);
