import { onMounted, ref, computed, toRef } from "vue";
import { canvasesStore, sessionStore } from "@/store";
import type { ImageElement, TextboxElement } from "@/models";

export function useActiveCanvas() {

    const canvas = computed(() => canvasesStore.canvases[canvasesStore.activeCanvas]);
    const canvasHTML = ref<HTMLElement | null>(null);
    const canvasFontSize = computed(() => sessionStore.session.fontSize);

    onMounted(() => {
        canvasHTML.value = document.getElementById('canvas') || null; 
    })

    return {
        canvas,
        elements: computed(() => canvas.value.elements),
        color: computed(() => canvas.value.color),
        canvasHTML,
        canvasFontSize,
    }

}