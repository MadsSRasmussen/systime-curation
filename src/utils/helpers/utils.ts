import type { CanvasElementPosition, TextboxData } from "@/types";

export const defaultCanvasElementPosition: () => CanvasElementPosition = () => ({ x: 0, y: 0 });
export const numberIsInRange = (nmb: number, min: number, max: number) => (nmb >= min && nmb <= max);

export const defaultTextboxData: () => TextboxData = () => ([{}]);