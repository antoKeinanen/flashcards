import type { IconEvents, IconProps } from "lucide-svelte";
import type { SvelteComponent } from "svelte";

export type DropdownOption = {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: SvelteComponent<IconProps, IconEvents, any> | undefined;
  onClick: () => void;
};
