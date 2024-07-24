<script setup lang="ts">
import type { PercentageDimensions } from '@/types';
import type { ImageElement } from '@/models';
import { menuStore } from '@/store';
import { onMounted, ref } from 'vue';
import { useClickAndDrag, useActiveCanvas, useCanvasElementMove } from '@/composables';
import { getNormalizedImagePixelDimensions, getRelativePercentageDimensions, mouseOnElement } from '@/utils/helpers';
import { ImageMenuCardThumbElement } from '@/components/sidebar/sections';

const props = defineProps<{
    image: ImageElement
}>();

const mouseOnMenu = ref<boolean>(false);

const { canvasHTML, canvas } = useActiveCanvas();
const dimensions = ref<PercentageDimensions>({ width: 0, height: 0 })
onMounted(async () => {
    const normalizedDimensions = await getNormalizedImagePixelDimensions(`images/${props.image.data.filename}`, props.image.data.scale);
    dimensions.value = getRelativePercentageDimensions(normalizedDimensions, canvasHTML);
})

const imageElement = ref<HTMLElement>();
const { moveElement, endMove } = useCanvasElementMove(props.image, imageElement, { clampInContainer: true });
const { } = useClickAndDrag(imageElement, { onDragStart: moveElement, onDrag: handleDrag, onDragEnd: handleDragEnd });
function handleDrag(e: MouseEvent) {
    if (mouseOnElement(e, menuStore.menuHTML)) {
        mouseOnMenu.value = true;
    } else {
        mouseOnMenu.value = false;
    }
}

function handleDragEnd(e: MouseEvent) {
    if (mouseOnElement(e, menuStore.menuHTML)) canvas.value.removeElement(props.image);
    endMove();
}
</script>
<template>
    <ImageMenuCardThumbElement v-if="mouseOnMenu" :src="`images/${image.data.filename}`" :scale="image.data.scale" />
    <div ref="imageElement" class="image_canvas_element" :style="{
        backgroundImage: `url(images/${image.data.filename})`,
        zIndex: props.image.zIndex,
        left: `${props.image.position.x * 100}%`,
        top: `${props.image.position.y * 100}%`,
        width: `${dimensions.width * 100}%`,
        height: `${dimensions.height * 100}%`,
        visibility: mouseOnMenu ? 'hidden' : 'visible',
    }">
    </div>
    
</template>
<style scoped>
.image_canvas_element {
    position: absolute;
    background-size: contain;
    cursor: pointer;
}
</style>