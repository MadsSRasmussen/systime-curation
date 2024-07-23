<script setup lang="ts">
import { Button } from '@/components';

const model = defineModel<boolean>();
defineProps<{
    title?: string,
}>();
</script>
<template>
    <teleport v-if="model" to="body">
        <div class="modal_backdrop" @click="model = false">
            <div class="modal_container" @click.stop>
                <div class="modal_header_container">
                    <h3 v-if="title" class="modal_title">{{ title }}</h3>
                    <div class="modal_button_container">
                        <slot name="buttons"></slot>
                        <Button @click="model = false" label="Luk vindue"/>
                    </div>
                </div>
                <div class="modal_content_container">
                    <slot />
                </div>
            </div>
        </div>
    </teleport>
</template>
<style scoped>
.modal_backdrop {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(1px);
    z-index: 101;
}
.modal_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    box-shadow: var(--box-shadow-default);
}
.modal_header_container {
    width: 100%;
    display: flex;
}
.modal_title {
    font-weight: bold;
    font-size: 24px;
    text-wrap: nowrap;
}
.modal_button_container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    width: 100%;
}
.modal_content_container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow-y: auto;
    max-height: 70vh;
    max-width: 70vw;
}
.modal_close_button {
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    float: right;
}
</style>