<script setup lang="ts">
import { TextboxElement, ImageElement } from '@/models';
import { Textbox, ImageCanvasElement } from '@/components';
defineProps<{
    element: TextboxElement | ImageElement
}>();

function isTextboxElement(element: TextboxElement | ImageElement): element is TextboxElement {
    return element instanceof TextboxElement;
}

</script>
<template>
    <Textbox v-if="isTextboxElement(element)" :textbox="element"/>
    <ImageCanvasElement v-else :image="element"/>
</template>