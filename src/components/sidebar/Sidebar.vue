<script setup lang="ts">
import { sessionStore, imagesStore } from '@/store';
import { SaveAndLoad, CanvasSelector, Tools, ImageGrid } from './sections';

</script>
<template>
    <div class="sidebar_container" :class="sessionStore.session.sidebarCollapsed ? 'collapsed' : ''">
        <div class="sidebar_content_wrapper">
            <div class="sidebar_content_container" :class="sessionStore.session.sidebarCollapsed ? 'collapsed' : ''">
                <SaveAndLoad />
                <CanvasSelector />
                <Tools />
                <ImageGrid :images="imagesStore.images"/>
            </div>
        </div>
    </div>
</template>
<style scoped>
.sidebar_container.collapsed {
    width: 50px;
    min-width: 50px;
}
.sidebar_content_container.collapsed {
    display: none;
}
.sidebar_content_container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    overflow-x: hidden;
    min-width: calc(var(--width-sidebar-container) - 15px);
}
.sidebar_container {
    width: var(--width-sidebar-container);
    min-width: var(--width-sidebar-container);
    position: relative;
    background-color: var(--color-background-soft);
    transition: var(--transition-slow);
    box-shadow: rgba(0, 0, 0, 0.173) -32px 0px 36px -28px inset;
}
.sidebar_content_wrapper {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
}
</style>