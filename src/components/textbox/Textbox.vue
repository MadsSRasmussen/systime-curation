<script setup lang="ts">
import type { TextboxFontColor } from '@/types';
import type { TextboxElement } from '@/models';
import { ref } from 'vue';
import { TextboxEditor, TextboxPreview } from '@/components';
import { useActiveCanvas, useCanvasElementMove, useTextboxElementResize } from '@/composables';

const props = defineProps<{
    textbox: TextboxElement
}>();

const textColor = ref<TextboxFontColor>(props.textbox.color);
const largeText = ref<boolean>(props.textbox.largeText);

const editing = ref<boolean>(true);
const { canvasFontSize, canvas } = useActiveCanvas();

const textboxContainer = ref<HTMLElement>();
const { move, moveing } = useCanvasElementMove(props.textbox, textboxContainer, { clampInContainer: true });
const { resize, resizeing } = useTextboxElementResize(props.textbox, textboxContainer, { clampInContainer: true });
function handleSetMeta() {
    props.textbox.color = textColor.value;
    props.textbox.largeText = largeText.value;
}
</script>
<template>
    <div ref="textboxContainer" :style="{ 
        display: 'flex', 
        flexDirection: 'column',
        fontSize: `${canvasFontSize}px`,
        left: `${textbox.position.x * 100}%`,
        top: `${textbox.position.y * 100}%`,
        width: `${textbox.dimensions.width * 100}%`,
        height: `${textbox.dimensions.height * 100}%`,
        zIndex: textbox.zIndex,
        userSelect: `${moveing || resizeing ? 'none' : 'auto'}`,
        color: textColor,
        }"
        class="textbox_parent_element_container"
    >   
        <TextboxEditor :class="largeText ? 'large_text' : ''" @set-meta="handleSetMeta" @focusout="editing = false"  v-if="editing" :textbox v-model:color="textColor" v-model:large-text="largeText" />
        <TextboxPreview :class="largeText ? 'large_text' : ''" @click="editing = true" v-else :textbox :moveing="moveing || resizeing" />
        <div class="bottom_section_container">
            <div @mousedown="move" v-if="editing || moveing" class="move_textbox_button" :style="{ backgroundImage: `url('./icons/svgs/move.svg')`}">
            </div>
        </div>
        <div v-if="editing || resizeing" class="textbox_resizers_container">
            <div @mousedown="resize('tl')" class="textbox_resizer" :style="{ top: '-3px', left: '-3px', cursor: 'nwse-resize' }"></div>
            <div @mousedown="resize('bl')" class="textbox_resizer" :style="{ bottom: '-3px', left: '-3px', cursor: 'nesw-resize' }"></div>
            <div @mousedown="resize('tr')" class="textbox_resizer" :style="{ top: '-3px', right: '-3px', cursor: 'nesw-resize' }"></div>
            <div @mousedown="resize('br')" class="textbox_resizer" :style="{ bottom: '-3px', right: '-3px', cursor: 'nwse-resize' }"></div>
        </div>
    </div>
</template>
<style scoped>
.textbox_resizers_container {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.textbox_resizer {
    width: 6px;
    height: 6px;
    border-radius: 5px;
    position: absolute;
    background-color: var(--color-background-mute);
    cursor: pointer;
    pointer-events: all;
}
.bottom_section_container {
    position: absolute;
    width: 100%;
    left: 0px;
    bottom: -30px;
    display: flex;
    justify-content: center;
}
.move_textbox_button {
    width: 25px;
    height: 25px;
    background-size: contain;
    padding: 2.5px;
    background-origin: content-box;
    background-repeat: no-repeat;
    cursor: pointer;
    border-radius: 12.5px;
}
.move_textbox_button:hover {
    background-color: var(--color-background-mute);
}

.textbox_parent_element_container {
    position: absolute;
    
}
.textbox_parent_element_container *  {
    transition: color 0.1s ease, background-color 0.2s ease;
}
.large_text {
    font-size: 2em;
}
</style>
<style>
.textbox-paragraph-element {
    min-height: 1em;
}
</style>