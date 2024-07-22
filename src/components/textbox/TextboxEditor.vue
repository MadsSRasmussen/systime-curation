<script setup lang="ts">
import type { TextboxElement } from '@/models';
import { ref } from 'vue';
import { useTextboxData } from '@/composables';

const props = defineProps<{
    textbox: TextboxElement
}>();

const textboxElement = ref<HTMLElement>();
const { bold, italic, underline, title } = useTextboxData(props.textbox, textboxElement)
</script>
<template>
    Editing <br />
    <div ref="textboxElement"></div>
    Bold: {{ bold }}, italic: {{ italic }}, underline: {{ underline }}, title: {{ title }}.
</template>