<script setup lang="ts">
import type { TextboxElement } from '@/models';
import { ref, useCssModule } from 'vue';
import { TextboxEditor, TextboxPreview } from '@/components';
import { useActiveCanvas } from '@/composables';

defineProps<{
    textbox: TextboxElement
}>();

const editing = ref<boolean>(false);

const { canvasFontSize } = useActiveCanvas();
</script>
<template>
    TEXTBOX
    <div :style="{ 
        display: 'flex', 
        flexDirection: 'column',
        fontSize: `${canvasFontSize}px` 
        }">
        <input type="checkbox" v-model="editing">
        <TextboxEditor v-if="editing" :textbox />
        <TextboxPreview v-else :textbox />
    </div>
</template>