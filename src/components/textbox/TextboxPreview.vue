<script setup lang="ts">
import type { TextboxElement } from '@/models';
import { DomRenderer } from '@/modules/text';

defineProps<{
    textbox: TextboxElement,
    moveing: boolean,
}>();
</script>
<template>
    <div class="textbox_element_preview_container" v-html="DomRenderer.toHTML(textbox.content)" :class="moveing ? 'outlined' : ''"></div>
</template>
<style scoped>
.textbox_element_preview_container {
    height: 100%;
    padding: 0.5em;
}
.textbox_element_preview_container:hover {
    outline: 1px solid var(--color-border);
    border-radius: 0.3em;
}
.textbox_element_preview_container.outlined {
    outline: 1px solid var(--color-border);
}
</style>