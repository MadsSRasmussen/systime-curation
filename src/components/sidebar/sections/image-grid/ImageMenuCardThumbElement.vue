<script setup lang="ts">
import type { PixelDimensions } from '@/types';
import { onMounted, ref } from 'vue';
import { useMousePosition } from '@/composables';
import { getNormalizedImagePixelDimensions } from '@/utils/helpers';

const props = defineProps<{
    src: string,
    scale: number,
}>();

const { x, y, } = useMousePosition();
const dimensions = ref<PixelDimensions>({ width: 0, height: 0 })

onMounted(async () => {
    dimensions.value = await getNormalizedImagePixelDimensions(props.src, props.scale);
})
</script>
<template>
    <Teleport to="body">
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