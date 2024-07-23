<script setup lang="ts">
import type { TextboxElement } from '@/models';
import { ref } from 'vue';
import { useTextboxData, useActiveCanvas } from '@/composables';

const props = defineProps<{
    textbox: TextboxElement
}>();

const textboxElement = ref<HTMLElement>();
const { bold, italic, underline, title } = useTextboxData(props.textbox, textboxElement)
const { canvasFontSize } = useActiveCanvas();

</script>
<template>
    Editing <br />
    <div class="textbox_element_container">
        <div ref="textboxElement" class="test" tabindex="0"></div>
    </div>
    
    Bold: {{ bold }}, italic: {{ italic }}, underline: {{ underline }}, title: {{ title }}.
</template>
<style scoped>
.test {
    border: 2px solid black;
}
</style>
<style>
.textbox-paragraph-element {
    width: fit-content;
    min-height: 0.01vh;
    white-space: pre-wrap;
}
@keyframes blink {
    50% { opacity: 0; }
}
.carret {
    background-color: black;
    width: 2px;
    height: calc(var(--font-size) + 2px);
    position: absolute;
    animation: blink 1s step-start infinite;
    pointer-events: none;
    z-index: 100;
}
.textbox-title-element {
    font-size: 2em;
}
</style>