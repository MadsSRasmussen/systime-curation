import { reactive, readonly } from "vue";
import type { CanvasData } from "@/types";
import { defaultCanvasData, numberIsInRange } from "@/utils/helpers";

const state = reactive<CanvasData[]>([]);

export const canvasesStore = readonly({
    canvases: state,
    addCanvas() {
        state.push(defaultCanvasData());
    },
    deleteCanvas(index: number = state.length - 1) {
        if (state.length < 2) throw new Error('Canvases array must contain at least one CanvasData instance');
        if (!numberIsInRange(index, 0, state.length - 1)) throw new Error('Invalid index');
        state.splice(index, 1);
    }
});