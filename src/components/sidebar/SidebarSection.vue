<script setup lang="ts">
defineProps<{
    label: string,
}>();
</script>
<template>
    <div class="sidebar_section_container">
        <span class="sidebar_section_title">{{ label }}</span>
        <div class="sidebar_section_content">
            <slot />
        </div>
    </div>
</template>
<style scoped>
.sidebar_section_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.sidebar_section_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.sidebar_section_title {
    font-weight: bold;
}
</style>