<script setup lang="ts">
import type { TextboxElement } from '@/models';
import { onBeforeUnmount, ref, nextTick } from 'vue';
import { TextboxFormatButton, Button, Dropdown } from '@/components';
import { useTextboxData, useActiveCanvas } from '@/composables';
import type { TextboxFontColor, TextSize } from '@/types';
const color = defineModel<TextboxFontColor>('color');
const textSize = defineModel<TextSize>('textSize', { required: true });

const colorData = [{
    name: 'Sort',
    value: 'black',
}, {
    name: 'Hvid',
    value: 'white',
}, {
    name: 'Grå',
    value: 'gray',
}]

const textSizeData = [{
    name: 'Normal',
    value: 'small',
}, {
    name: 'Stor',
    value: 'medium',
}, {
    name: 'Ekstra stor',
    value: 'large',
}]

const props = defineProps<{
    textbox: TextboxElement
}>();

function updateCursor(value: string) {
    // Style changes from class change needs to be applied before updateing the cursor via the setCursorSize funciton...
    nextTick(() => {
        setCursorSize(value as TextSize);
    })
}

const emit = defineEmits(['setMeta']);
onBeforeUnmount(() => emit('setMeta'));
const textboxElement = ref<HTMLElement>();
const { bold, italic, underline, format, setCursorSize } = useTextboxData(props.textbox, textboxElement, textSize.value);
const { canvas } = useActiveCanvas();
</script>
<template>
    <div class="textbox_element_container">
        <div class="textbox_top_elements_container">
            <div class="textbox_format_buttons_container">
                <TextboxFormatButton @click="format('strong')" html="<b>B</b>" :selected="bold" />
                <TextboxFormatButton @click="format('em')" html="<i>I</i>" :selected="italic" />
                <TextboxFormatButton @click="format('u')" html="<u>U</u>" :selected="underline" />
                <Dropdown :data="colorData" v-model="color" />
                <Dropdown :data="textSizeData" v-model="textSize" v-on:update:model-value="updateCursor" :style="{ width: '80px' }" />
            </div>
            <div class="textbox_delte_button_container">
                <Button @click="canvas.removeElement(textbox)" @mousedown="(e) => { e.preventDefault() }" icon="trash" :style="{ maxHeight: '20px', height: '20px', maxWidth: '20px', width: '20px', padding: '0px' }" />
            </div>
        </div>
        <div ref="textboxElement" class="textbox_element_content" tabindex="0"></div>
    </div>
</template>
<style scoped>
.textbox_delte_button_container {
    width: 20px;
    height: 20px;
}
.textbox_top_elements_container {
    position: absolute;
    height: 20px;
    top: -25px;
    left: 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: black;
}
.textbox_format_buttons_container {
    display: flex;
    gap: 5px;
}
.textbox_element_content {
    height: 100%;
    outline: none;
}
.textbox_element_container {
    height: 100%;
    outline: 1px solid var(--color-border);
    border-radius: 5px;
    padding: 0.5em;
    position: relative;
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