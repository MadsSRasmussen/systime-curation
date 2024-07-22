<script setup lang="ts">
import { useCanvas } from '@/composables';
import { TextboxElement } from '@/models';

const { canvas } = useCanvas();
canvas.addElement(new TextboxElement)
</script>
<template>
    {{ canvas }}
    {{ JSON.stringify(canvas) }}
</template>