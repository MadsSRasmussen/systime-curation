<script setup lang="ts">
import type { PixelDimensions } from '@/types';
import { onMounted, onUnmounted, ref } from 'vue';
import { useMousePosition } from '@/composables';
import { getNormalizedImagePixelDimensions, mouseOnElement } from '@/utils/helpers';
import { menuStore } from '@/store';

const props = defineProps<{
    src: string,
    scale: number,
}>();

const { x, y, } = useMousePosition();
const dimensions = ref<PixelDimensions>({ width: 0, height: 0 })

onMounted(async () => {
    dimensions.value = await getNormalizedImagePixelDimensions(props.src, props.scale);
    document.addEventListener('mousemove', handleMouseMove);
})
onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    if (menuStore.displayDeleteSymbol) menuStore.toggleDeleteSymbol();
})

function handleMouseMove(e: MouseEvent) {
    if (mouseOnElement(e, menuStore.menuHTML) && !menuStore.displayDeleteSymbol) {
        menuStore.toggleDeleteSymbol()
    } 
    else if (!mouseOnElement(e, menuStore.menuHTML) && menuStore.displayDeleteSymbol) {
        menuStore.toggleDeleteSymbol();
    }
}
</script>
<template>
    <Teleport to="#application_container">
        <div class="image_menu_thumb_element" :style="{ 
            backgroundImage: `url(${src})`,
            left: `${x - 0.5 * dimensions.width}px`,
            top: `${y - 0.5 * dimensions.height}px`,
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            }"
        ></div>
    </Teleport>
</template>
<style scoped>
.image_menu_thumb_element {
    position: absolute;
    background-size: contain;
    cursor: pointer;
    z-index: 100;
}
</style>