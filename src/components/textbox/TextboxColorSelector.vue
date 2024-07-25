<script setup lang="ts">
import type { TextboxFontColor } from '@/types';
import { ref } from 'vue';

const model = defineModel<TextboxFontColor>();
const selectElement = ref<HTMLSelectElement>();
function handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    if (!selectElement.value) throw new Error('Select element required');
    selectElement.value.togglePopover();
}
</script>
<template>
    <select ref="selectElement" @click="console.log('Clicked!')" @mousedown="handleMouseDown" v-model="model" class="textbox_color_selector">
        <option value="white">Hvid</option>
        <option value="black">Sort</option>
        <option value="gray">Grå</option>
    </select>
</template>
<style scoped>
.textbox_color_selector {
    border: 2px solid red;
}
</style>