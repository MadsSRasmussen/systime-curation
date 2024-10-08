<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { sessionStore, sidebarStore } from '@/store';
import { useActiveCanvas } from '@/composables';
import { CanvasElement } from '@/components';
import type { ImageElement, TextboxElement } from '@/models';
import Textbox from '@/modules/text';

const { color, canvas } = useActiveCanvas();

const canvasElement = ref<HTMLElement>();

const observer = new ResizeObserver(handleCanvasElementResize)
onMounted(() => {
    if (!canvasElement.value) throw new Error('canvasElment must be defined');
    observer.observe(canvasElement.value);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
})
onUnmounted(() => {
    window.removeEventListener('beforeinput', handleBeforePrint);
    window.removeEventListener('afterprint', handleAfterPrint);
})

function handleCanvasElementResize() {  
    if (!canvasElement.value) throw new Error('canvasElment must be defined');
    sessionStore.setFontSize(canvasElement.value.getBoundingClientRect().width / 100);
    Textbox.fontSize = canvasElement.value.getBoundingClientRect().width / 100;
}

let onPrintFontSize: number | null = null;
const canvasContainer = ref<HTMLElement>();
function handleBeforePrint() {
    if (!canvasContainer.value) throw new Error('CanvasContainer must be defined');
    canvasContainer.value.classList.add('canvas_container_fixed_width');
    onPrintFontSize = sessionStore.session.fontSize;
    sessionStore.setFontSize(window.innerWidth / 100);
}
function handleAfterPrint() {
    if (!canvasContainer.value) throw new Error('CanvasContainer must be defined');
    canvasContainer.value.classList.remove('canvas_container_fixed_width');
    if (onPrintFontSize) sessionStore.setFontSize(onPrintFontSize);
}
</script>
<template>
    <div ref="canvasContainer" class="canvas_container">
        <div class="canvas_ceiling"></div>
        <div :style="{ backgroundColor: color }" class="canvas" id="canvas" ref="canvasElement">
            <img v-if="sidebarStore.displayShilhouet" class="shilhouet_element" :src="'./images/shilhouet.png'">
            <CanvasElement v-for="element in (canvas.elements as (TextboxElement | ImageElement)[])" :key="element.id" :element="element" />
        </div>
        <div class="canvas_floor"></div>
    </div>
</template>
<style scoped>
.canvas_container_fixed_width {
    position: absolute;
    max-width: 1000px;
    min-width: 1000px;
    width: 1000px;
    height: 750px;
}
.shilhouet_element {
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 50%;
    object-fit: contain;
    user-select: none;
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
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
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