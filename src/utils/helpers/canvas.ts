import type { CanvasElementDimensions, CanvasElementPosition } from "@/types";
import { getImageDimensions, normalizeDimensions } from "@/utils/helpers";
import { useActiveCanvas } from "@/composables";

export const defaultCanvasElementPosition: () => CanvasElementPosition = () => ({ x: 0.35, y: 0.4 });
export const defaultCanvasElementDimensions: () => CanvasElementDimensions = () => ({ width: 0.3, height: 0.2 });

export async function getNormalizedImagePixelDimensions(src: string, scale: number) {

    const canvasHTML = document.getElementById('canvas');
    if (!canvasHTML) throw new Error('CanvasHTML required');
    const canvasRect = canvasHTML.getBoundingClientRect();

    const rawImageDimensions = await getImageDimensions(src);
    const normalizedDimensions = normalizeDimensions(rawImageDimensions);
    return { width: normalizedDimensions.width * scale * (canvasRect.width) / 100, height: normalizedDimensions.height * scale * (canvasRect.width) / 100 }

}