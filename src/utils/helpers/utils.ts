import type { CanvasElementPosition, PixelPosition } from "@/types";

export const numberIsInRange = (nmb: number, min: number, max: number) => (nmb >= min && nmb <= max);
export const topLeftOffset = (e: MouseEvent, rect: DOMRect): PixelPosition => ({ x: e.clientX - rect.left, y: e.clientY - rect.top });
export const percentagePosition = (pos: PixelPosition, rect: DOMRect): CanvasElementPosition => ({ x: (pos.x - rect.left) / rect.width, y: (pos.y - rect.top) / rect.height });
export const clamp = (nmb: number, min: number, max: number): number => Math.min(Math.max(nmb, min), max);
export const clampPositionInContainer = (pos: PixelPosition, conRec: DOMRect, childRec: DOMRect): PixelPosition => ({ x: clamp(pos.x, conRec.left, conRec.right - childRec.width), y: clamp(pos.y, conRec.top, conRec.bottom - childRec.height) });