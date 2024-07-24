<script setup lang="ts">
import type { ImageData } from '@/types';
import { ref } from 'vue';
import { useClickAndDrag } from '@/composables';

defineProps<{
    data: ImageData,
}>();

const container = ref<HTMLElement>();

const { dragging } = useClickAndDrag(container, {});

</script>
<template>
    <div class="sidebar_image_element_container" ref="container">
        <img :src="`images/${data.fileName}`" :alt="`Image of ${data.title}`" class="sidebar_image_element_image" draggable="false" >
        <div class="sidebar_image_title">{{ data.title }}</div>
    </div>
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