<script setup lang="ts">
import type { TextboxElement } from '@/models';
import { DomRenderer } from '@/modules/text';

defineProps<{
    textbox: TextboxElement
}>();
</script>
<template>
    <div v-html="DomRenderer.toHTML(textbox.content)"></div>
</template>