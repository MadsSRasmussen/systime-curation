<script setup lang="ts">
import type { TextboxElement } from '@/models';
import { DomRenderer } from '@/modules/text';

defineProps<{
    textbox: TextboxElement
}>();
</script>
<template>
    <div class="textbox_element_preview_container" v-html="DomRenderer.toHTML(textbox.content)"></div>
</template>
<style scoped>
.textbox_element_preview_container {
    height: 100%;
}
.textbox_element_preview_container:hover {
    outline: 1px solid black;
}
</style>