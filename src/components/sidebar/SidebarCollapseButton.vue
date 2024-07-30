<script setup lang="ts">
import { sidebarStore } from '@/store';
</script>
<template>
    <div @click="sidebarStore.toggleSidebarCollapse" class="sidebar_collapse_button_container" :class="sidebarStore.sidebarCollapsed ? 'rotate180 collapsed' : ''">
        <span class="sidebar_collapse_button_label"><</span>
    </div>
</template>
<style scoped>
.rotate180 {
    transform: rotate(180deg);
}

.sidebar_collapse_button_container {
    position: absolute;
    top: 17px;
    right: 20px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    transition: var(--transition-medium);
    cursor: pointer;
}
.sidebar_collapse_button_container {
    border-color: var(--color-border-hover);
}

.sidebar_collapse_button_container.collapsed {
    right: 10px;
}

.sidebar_collapse_button_label {
    position: relative;
    top: -2px;
    font-weight: bold;
    user-select: none;
}
</style>