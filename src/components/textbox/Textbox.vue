<script setup lang="ts">
import type { TextboxElement } from '@/models';
import { ref } from 'vue';
import { TextboxEditor, TextboxPreview } from '@/components';
import { useActiveCanvas, useCanvasElementMove } from '@/composables';

const props = defineProps<{
    textbox: TextboxElement
}>();


const editing = ref<boolean>(true);
const { canvasFontSize, canvas } = useActiveCanvas();

const textboxContainer = ref<HTMLElement>();
const { moveElement } = useCanvasElementMove(props.textbox, textboxContainer, { clampInContainer: true })
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
        }"
        class="textbox_parent_element_container"
    >   
        <button @mousedown="moveElement">MOVE</button>
        <TextboxEditor @focusout="editing = false" v-if="editing" :textbox />
        <TextboxPreview @click="editing = true" v-else :textbox />
    </div>
</template>
<style scoped>
.textbox_parent_element_container {
    position: absolute;
}
</style>