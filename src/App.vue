<script setup lang="ts">
import { TextboxElement } from '@/models';
import { useActiveCanvas } from './composables';
import { Textbox, Menu } from '@/components';

const { elements } = useActiveCanvas();

const textboxElements = elements as TextboxElement[]

</script>
<template>
    <Menu />
    <Textbox v-for="textbox in textboxElements" :textbox />
</template>
