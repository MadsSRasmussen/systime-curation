<script setup lang="ts">
const props = defineProps<{
    html: string,
    selected: boolean,
}>();
defineEmits(['format']);
</script>
<template>
    <div @mousedown="(e) => { e.preventDefault() }" class="textbox_format_button" :class="props.selected ? 'selected' : ''" v-html="props.html"></div>
</template>
<style scoped>
.textbox_format_button {
    height: 20px;
    width: 20px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.textbox_format_button:hover {
    background-color: var(--color-background-mute);
}
.textbox_format_button.selected {
    background-color: var(--color-background-mute);
}
</style>