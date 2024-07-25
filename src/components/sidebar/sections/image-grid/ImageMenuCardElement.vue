<script setup lang="ts">
import type { ImageData } from '@/types';
import { ref } from 'vue';
import { useClickAndDrag, useActiveCanvas } from '@/composables';
import { ImageMenuCardThumbElement } from '@/components/sidebar/sections';
import { ImageInfoModal } from '@/components';
import { mouseOnElement, getRelativePercentagePosition, getNormalizedImagePixelDimensions, clampPositionInElement, clampElementPositionTopLeftInContainer, getRect } from '@/utils/helpers';
import { ImageElement } from '@/models';

const props = defineProps<{
    data: ImageData,
    id: string,
}>();

const container = ref<HTMLElement>();
const displayInfo = ref<boolean>(false);

const { dragging } = useClickAndDrag(container, { onDragEnd: handleDragEnd, onClick: () => { displayInfo.value = true } });
const { canvasHTML, canvas } = useActiveCanvas();

async function handleDragEnd(e: MouseEvent) {
    if (!mouseOnElement(e, canvasHTML)) return;
    const imageDimensions = await getNormalizedImagePixelDimensions(`images/${props.data.fileName}`, props.data.scale);
    const topLeftPosition = { x: e.clientX - 0.5 * imageDimensions.width, y: e.clientY - 0.5 * imageDimensions.height };
    const clampedPosition = clampElementPositionTopLeftInContainer(topLeftPosition, getRect(canvasHTML), imageDimensions);
    const relativePosition = getRelativePercentagePosition(clampedPosition, canvasHTML);
    canvas.value.addElement(new ImageElement({ id: props.id, filename: props.data.fileName, scale: props.data.scale }, props.id, relativePosition));
}
</script>
<template>
    <div class="sidebar_image_element_container" ref="container">
        <img :src="`images/${data.fileName}`" :alt="`Image of ${data.title}`" class="sidebar_image_element_image" draggable="false" >
        <div class="sidebar_image_title">{{ data.title }}</div>
    </div>
    <ImageMenuCardThumbElement v-if="dragging" :src="`images/${data.fileName}`" :scale="data.scale" />
    <ImageInfoModal v-model="displayInfo" :image-id="props.id" />
</template>
<style scoped>
.sidebar_image_element_container {
    position: relative;
    justify-self: stretch;
    height: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
}
.sidebar_image_element_container:hover {
    background-color: var(--color-background-mute);
}
.sidebar_image_title {
    width: 100%;
    object-fit: contain;
    pointer-events: none;
    text-wrap: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    align-self: flex-end;
    text-align: center;
}
.sidebar_image_element_image {
    width: 100%;
    height: 160px;
    object-fit: contain;
}
</style>