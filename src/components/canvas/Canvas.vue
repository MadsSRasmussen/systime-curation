<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { sessionStore } from '@/store';
import { useActiveCanvas } from '@/composables';
import { CanvasElement } from '@/components';
import type { ImageElement, TextboxElement } from '@/models';
import Textbox from '@/modules/text';

const { color, elements, canvasFontSize, canvas } = useActiveCanvas();

const canvasElement = ref<HTMLElement>();

const observer = new ResizeObserver(handleCanvasElementResize)
onMounted(() => {
    if (!canvasElement.value) throw new Error('canvasElment must be defined');
    observer.observe(canvasElement.value)
})

function handleCanvasElementResize() {  
    if (!canvasElement.value) throw new Error('canvasElment must be defined');
    sessionStore.setFontSize(canvasElement.value.getBoundingClientRect().width / 100);
    Textbox.fontSize = canvasElement.value.getBoundingClientRect().width / 100;
}
</script>
<template>
    <div class="canvas_container">
        <div class="canvas_ceiling"></div>
        <div :style="{ backgroundColor: color }" class="canvas" id="canvas" ref="canvasElement">
            <CanvasElement v-for="element in (canvas.elements as (TextboxElement | ImageElement)[])" :element="element" />
        </div>
        <div class="canvas_floor"></div>
    </div>
</template>
<style scoped>
.shilhouet_element {
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 35%;
    object-fit: contain;
}
.canvas {
    position: relative;
    width: 100%;
    aspect-ratio: 2.5;
    box-sizing: border-box;
    overflow: hidden;
    /*transition: 300ms;*/
}
.canvas_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.canvas_ceiling {
    border-bottom: 4px solid var(--ceiling-border-color);
    background: rgb(255, 255, 255);
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 30%, rgba(231, 231, 231, 1) 80%);
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
}
.canvas_floor {
    display: flex;
    border-top: 4px solid var(--floor-border-color);
    background-image: url(../misc/floor-backdrop.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 0%;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
}
</style>