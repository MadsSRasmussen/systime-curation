<script setup lang="ts">
import type { TextboxElement } from '@/models';
import { ref, useCssModule } from 'vue';
import { TextboxEditor, TextboxPreview } from '@/components';
import { useActiveCanvas } from '@/composables';

defineProps<{
    textbox: TextboxElement
}>();

const editing = ref<boolean>(true);

const { canvasFontSize } = useActiveCanvas();
</script>
<template>
    <div :style="{ 
        display: 'flex', 
        flexDirection: 'column',
        fontSize: `${canvasFontSize}px`,
        left: `${textbox.position.x * 100}%`,
        top: `${textbox.position.y * 100}%`,
        width: `${textbox.dimensions.width * 100}%`,
        height: `${textbox.dimensions.height * 100}%`,
        }"
        class="textbox_parent_element_container"
    >
        <TextboxEditor @focusout="editing = false" v-if="editing" :textbox />
        <TextboxPreview @click="editing = true" v-else :textbox />
    </div>
</template>
<style scoped>
.textbox_parent_element_container {
    position: absolute;
}
</style>