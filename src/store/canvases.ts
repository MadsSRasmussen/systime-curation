import { Canvas } from "@/models";
import { reactive, readonly } from "vue";
import { numberIsInRange } from "@/utils/helpers";

const state = reactive<Canvas[]>([]);

export const canvasesStore = readonly({
    canvases: state,
    addCanvas() {
        state.push(new Canvas());
    },
    deleteCanvas(index: number = state.length - 1) {
        if (state.length < 2) throw new Error('Canvases array must contain at least one CanvasData instance');
        if (!numberIsInRange(index, 0, state.length - 1)) throw new Error('Invalid index');
        state.splice(index, 1);
    }
});