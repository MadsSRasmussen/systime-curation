<script setup lang="ts">
import { ref, computed } from 'vue';
import { canvasesStore } from '@/store';
import { SidebarSection, Modal, Button } from '@/components';

const displayModal = ref<boolean>(false)

const canvasIndexArray = computed(() => Array.from({ length: canvasesStore.canvases.length }, (_, i) => i))

function deleteCanvas() {
    canvasesStore.deleteCanvas()
    displayModal.value = false;
}

function nextCanvas() {
    if (canvasesStore.activeCanvas == canvasesStore.canvases.length - 1) canvasesStore.setActiveCanvas(0);
    else canvasesStore.setActiveCanvas(canvasesStore.activeCanvas + 1);
}

function previousCanvas() {
    if (canvasesStore.activeCanvas == 0) canvasesStore.setActiveCanvas(canvasesStore.canvases.length - 1);
    else canvasesStore.setActiveCanvas(canvasesStore.activeCanvas - 1);
}
</script>
<template>
    <SidebarSection label="Vægge">
        <div class="canvas_selector_selectors_container">
            <div @click="previousCanvas" class="sidebar_canvas_selector_button">&#10094;</div>
            <div @click="canvasesStore.setActiveCanvas(index)" v-for="index in canvasIndexArray"  :class="canvasesStore.activeCanvas == index ? 'selected' : ''" class="sidebar_canvas_selector_button">{{ index + 1 }}</div>
            <div @click="canvasesStore.addCanvas" v-if="canvasesStore.canvases.length !== canvasesStore.maxCanvases" class="sidebar_canvas_selector_button">+</div>
            <div @click="nextCanvas" class="sidebar_canvas_selector_button">&#10095;</div>
        </div>
        <Button @click="displayModal = true" alignment="left" icon="trash" label="Slet væg" />
    </SidebarSection>
    <Modal v-model="displayModal">
        <div class="canvas_selector_modal_content_container">
            <p>Er du sikker på at du vil slette dette canvas?</p>
            <Button @click="deleteCanvas" label="Slet" />
        </div>
    </Modal>
</template>
<style scoped>
.canvas_selector_selectors_container {
    display: flex;
}
.canvas_selector_modal_content_container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.sidebar_canvas_selector_button {
    width: 25px;
    height: 25px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 150ms;
}
.sidebar_canvas_selector_button:hover {
    background-color: var(--color-background-mute);
}
.selected {
    background-color: var(--color-background);
    font-weight: bold;
}
</style>