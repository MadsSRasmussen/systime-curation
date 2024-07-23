<script setup lang="ts">
import { TextboxElement } from '@/models';
import { useActiveCanvas } from './composables';
import { Textbox, Sidebar, Canvas } from '@/components';

const { elements } = useActiveCanvas();

const textboxElements = elements as TextboxElement[]

</script>
<template>
    <div class="application_container">
        <Sidebar />
        <Canvas />
    </div>
</template>
<style scoped>
.application_container {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    display: flex;
}
</style>
