import type { CanvasElementDimensions, CanvasElementPosition } from "@/types"

export const defaultCanvasElementPosition: () => CanvasElementPosition = () => ({ x: 0.35, y: 0.4 });
export const defaultCanvasElementDimensions: () => CanvasElementDimensions = () => ({ width: 0.3, height: 0.2 });