<script setup lang="ts">
import type { TextboxElement } from '@/models';
import { ref } from 'vue';
import { TextboxEditor, TextboxPreview } from '@/components/textbox';

const editing = ref<boolean>(false);

defineProps<{
    textbox: TextboxElement
}>();
</script>
<template>
    <div :style="{ display: 'flex', flexDirection: 'column' }">
        <input type="checkbox" v-model="editing">
        <TextboxEditor v-if="editing" :textbox />
        <TextboxPreview v-else :textbox />
    </div>

</template>