import type { TextboxData } from "@/types";

export const numberIsInRange = (nmb: number, min: number, max: number) => (nmb >= min && nmb <= max);

export const defaultTextboxData: () => TextboxData = () => ([{}]);