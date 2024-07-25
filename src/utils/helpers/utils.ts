import type { CanvasElementPosition, PercentagePosition, PixelPosition, PixelDimensions, PercentageDimensions } from "@/types";
import { toRef, type Ref } from "vue";

export const numberIsInRange = (nmb: number, min: number, max: number) => (nmb >= min && nmb <= max);
export const topLeftOffset = (e: MouseEvent, rect: DOMRect): PixelPosition => ({ x: e.clientX - rect.left, y: e.clientY - rect.top });
export const percentagePosition = (pos: PixelPosition, rect: DOMRect): PercentagePosition => ({ x: (pos.x - rect.left) / rect.width, y: (pos.y - rect.top) / rect.height });
export const percentageDimensions = (dim: PixelDimensions, rect: DOMRect): PercentageDimensions => ({ width: (dim.width / rect.width), height: (dim.height / rect.height) });
export const absolutePosition = (pos: PercentagePosition, rect: DOMRect): PixelPosition => ({ x: pos.x * rect.width + rect.left, y: pos.y * rect.height + rect.top });
export const absoluteDimensions = (dim: PercentageDimensions, rect: DOMRect): PixelDimensions => ({ width: dim.width * rect.width, height: dim.height * rect.height });
export const absoluteOffsets = (pos1: PixelPosition, pos2: PixelPosition): PixelPosition => ({ x: pos1.x - pos2.x, y: pos1.y - pos2.y });
export const clamp = (nmb: number, min: number, max: number): number => Math.min(Math.max(nmb, min), max);
export const clampElementPositionInContainer = (pos: PixelPosition, conRec: DOMRect): PixelPosition => ({ x: clamp(pos.x, conRec.left, conRec.right), y: clamp(pos.y, conRec.top, conRec.bottom) })
export const clampElementPositionTopLeftInContainer = (pos: PixelPosition, conRec: DOMRect, childRec: DOMRect | PixelDimensions): PixelPosition => ({ x: clamp(pos.x, conRec.left, conRec.right - childRec.width), y: clamp(pos.y, conRec.top, conRec.bottom - childRec.height) });
export const clampElementDimensionsInContainer = (dim: PixelDimensions, conRec: DOMRect, childRec: DOMRect): PixelDimensions => ({ width: clamp(dim.width, 0, conRec.width - (childRec.left - conRec.left)), height: clamp(dim.height, 0, conRec.height - (childRec.top - conRec.top))  });
export const clampPositionInContainer = (pos: PixelPosition, conRec: DOMRect): PixelPosition => ({ x: clamp(pos.x, conRec.left, conRec.right), y: clamp(pos.y, conRec.top, conRec.bottom) });

export function getRect(element: HTMLElement | null | Ref<HTMLElement | undefined | null>): DOMRect {
    const elementRef = toRef(element);
    if (!elementRef.value) throw new Error('Element is required');
    return elementRef.value.getBoundingClientRect();
}

export function mouseInRect(pos: PixelPosition, rect: DOMRect): boolean {
    if (pos.x < rect.left || pos.x > rect.right) return false;
    if (pos.y < rect.top || pos.y > rect.bottom) return false;
    return true;
}

export function mouseOnElement(e: MouseEvent, element: HTMLElement | null | Ref<HTMLElement | undefined | null>) {
    const elementRect = getRect(element)
    return mouseInRect({ x: e.clientX, y: e.clientY}, elementRect)
}

export function clampPositionInElement(position: PixelPosition, element: HTMLElement | Ref<HTMLElement | undefined | null>) {
    const elementRect = getRect(element)
    return clampPositionInContainer(position, elementRect);
}

export function getRelativePercentagePosition(position: PixelPosition, element: HTMLElement | Ref<HTMLElement | undefined | null>) {
    const elementRect = getRect(element)
    return percentagePosition(position, elementRect);
}

export function getRelativePercentageDimensions(dimensions: PixelDimensions, element: HTMLElement | Ref<HTMLElement | undefined | null>) {
    const elementRect = getRect(element);
    return percentageDimensions(dimensions, elementRect);
}