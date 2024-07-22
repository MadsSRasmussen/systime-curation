<script setup lang="ts">
import { TextboxElement } from '@/models';
import { Textbox } from '@/components/textbox';

const anElement = new TextboxElement();

</script>
<template>
    Hello, world
    <Textbox :textbox="anElement" />
</template>
