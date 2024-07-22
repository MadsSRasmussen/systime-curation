import { canvasesStore } from "@/store/canvases";

export function useActiveCanvas() {

    const canvas = canvasesStore.canvases[canvasesStore.activeCanvas];

    return {
        elements: canvas.elements,
        color: canvas.color,
    }

}