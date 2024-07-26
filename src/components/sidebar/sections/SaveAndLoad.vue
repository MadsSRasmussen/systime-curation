<script setup lang="ts">
import { SidebarSection, Button } from '@/components';
import { imagesStore } from '@/store';
import { CanvasLoader } from '@/utils';

function save() {
    if(!imagesStore.imagesFetched) return;
    CanvasLoader.downloadFile();
}

function load() {
    if(!imagesStore.imagesFetched) return;
    CanvasLoader.loadFile();
}
</script>
<template>
    <SidebarSection label="Udstillling">
        <Button @click="save" icon="save" alignment="left" label="Gem udstilling" />
        <Button @click="load" icon="open-folder" alignment="left" label="Åbn udstilling" />
    </SidebarSection>
</template>