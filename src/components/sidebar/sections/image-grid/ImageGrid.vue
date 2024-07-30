<script setup lang="ts">
import { computed } from 'vue';
import type { ImageRootData } from '@/types';
import { ImageMenuCardElement } from '@/components/sidebar/sections';
import { SidebarSection } from '@/components';

const props = defineProps<{
    images: ImageRootData[],
}>();

const unInstantiatedImages = computed(() => props.images.filter((img) => !img.instantiated))
</script>
<template>
    <SidebarSection label="Værksamling">
        <div class="images_grid_container">
            <ImageMenuCardElement v-for="image in unInstantiatedImages" :data="image.data" :id="image.id" :key="image.id"/>
        </div>
    </SidebarSection>
</template>
<style scoped>
.images_grid_container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: 200px;
    gap: 1rem;
}
</style>