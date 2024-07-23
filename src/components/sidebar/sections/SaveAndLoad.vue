<script setup lang="ts">
import { SidebarSection, Button } from '@/components';

function save() {
    console.log('Saveing...');
}

function load() {
    console.log('Loading...');
}
</script>
<template>
    <SidebarSection label="Udstillling">
        <Button @click="save" icon="save" alignment="left" label="Gem udstilling" />
        <Button @click="load" icon="open-folder" alignment="left" label="Åbn udstilling" />
    </SidebarSection>
</template>