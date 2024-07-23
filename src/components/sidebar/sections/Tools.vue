<script setup lang="ts">
import { SidebarSection, Button } from '@/components';
import { useActiveCanvas } from '@/composables';

const { canvas } = useActiveCanvas();

</script>
<template>
    <SidebarSection label="Værktøjer">
        <div>
            <label for="canvas_color_input">
                <Button icon="color-picker" alignment="left"label="Vælg vægfarve" />
            </label>
            <input v-model="canvas.color" type="color" style="display: none;" name="canvas_color" id="canvas_color_input">
        </div>
        <Button @click="() => {canvas.createTextbox()}" icon="edit" alignment="left" label="Skriv tekst" />
    </SidebarSection>
</template>