<script setup lang="ts">
import { SidebarSection, Button, Modal } from '@/components';
import { imagesStore } from '@/store';
import { CanvasLoader } from '@/utils';
import { ref, nextTick } from 'vue';

const displaySaveFileModal = ref<boolean>(false);
const nameOfFileToSave = ref<string>('');

function save() {
    if(!imagesStore.imagesFetched) return;
    CanvasLoader.downloadFile(nameOfFileToSave.value);
    displaySaveFileModal.value = false;
}

function load() {
    if(!imagesStore.imagesFetched) return;
    CanvasLoader.loadFile();
}

function print() {
    const event = new Event('beforeprint');
    window.dispatchEvent(event);
    setTimeout(window.print, 0);
}
</script>
<template>
    <SidebarSection>
        <Button @click="displaySaveFileModal = true" icon="save" alignment="left" label="Gem udstilling" />
        <Button @click="load" icon="open-folder" alignment="left" label="Åbn udstilling" />
        <Button @click="print" icon="printer" alignment="left" label="Print væg" />
    </SidebarSection>
    <Modal v-model="displaySaveFileModal">
        <div class="save_file_modal_content_container">
            <div class="filename_input_container">
                <input @keyup.enter="save()" class="save_file_filename_input" type="text" v-model="nameOfFileToSave" placeholder="Filnavn">
                <span>.can</span>
            </div>
            <div class="button_container">
                <Button @click="save()" label="Gem fil" />
            </div>
        </div>
    </Modal>
</template>
<style scoped>
.save_file_modal_content_container {
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: baseline;
}
.filename_input_container {
    display: flex;
    align-items: baseline;
    gap: 0.3em;
}
.button_container {
    width: 100%;
}
.save_file_filename_input {
    border: 1px solid var(--color-border);
    outline: none;
    padding: 5px;
    border-radius: 5px;
    font-size: 1em;
    color: var(--color-text);
}
</style>