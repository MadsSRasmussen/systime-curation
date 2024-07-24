import { Canvas } from "@/models";
import { reactive, readonly, ref } from "vue";
import { numberIsInRange } from "@/utils/helpers";

let state = reactive<Canvas[]>([new Canvas()]);

const _maxCanvases = 10
const activeCanvas = ref<number>(0);

export const canvasesStore = reactive({
    canvases: state,
    activeCanvas,
    get maxCanvases() {
        return _maxCanvases
    },
    setActiveCanvas(index: number) {
        if (!numberIsInRange(index, 0, state.length - 1)) throw new Error('Invalid index');
        activeCanvas.value = index;
    },
    addCanvas(canvas?: Canvas) {
        if (!canvas) {
            if (this.canvases.length > this.maxCanvases - 1) throw new Error('Canvases array is of maximum length');
            state.push(new Canvas());
            this.setActiveCanvas(this.canvases.length - 1);
        } else {
            state.push(canvas);
            console.log(state);
            console.log(this.canvases);
            this.setActiveCanvas(this.canvases.length - 1);
        }
    },
    deleteCanvas(index: number = activeCanvas.value) {
        if (state.length < 2) throw new Error('Canvases array must contain at least one Canvas instance');
        if (!numberIsInRange(index, 0, state.length - 1)) throw new Error('Invalid index');
        if (index == 0) this.setActiveCanvas(this.canvases.length - 2);
        else this.setActiveCanvas(index - 1);
        state.splice(index, 1);
    },
    reset(canvases: Canvas[]) {
        const canvasesLength = this.canvases.length;
        for(let i = 0; i < canvasesLength - 1; i++) {
            this.deleteCanvas();
        }
        canvases.forEach((canvas, index) => {
            state[index] = canvas;
        })
    },
});