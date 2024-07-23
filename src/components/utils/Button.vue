<script setup lang="ts">
defineProps<({
    label?: string,
    alignment?: 'left' | 'right',
    icon?: string,
})>();
</script>
<template>
    <div class="button_container" :class="alignment || ''">
        <img v-if="icon" class="button_icon" :src="`./icons/svgs/${icon}.svg`" :alt="icon">
        {{ label }}
        <slot />
    </div>
</template>
<style scoped>
.button_container {
    height: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25em;
    transition: 150ms;
    gap: 0.25rem;
}

.left {
    justify-content: flex-start;
}

.right {
    justify-content: flex-end;
}

.button_container:hover {
    background-color: var(--color-background-mute);
}

.button_icon {
    height: 1rem;
    aspect-ratio: 1;
    filter: var(--image-to-text-color-filter);
}
</style>