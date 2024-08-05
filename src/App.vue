<script setup lang="ts">
import { Sidebar, Canvas, PrintOverlay } from '@/components';
import { onMounted, onUnmounted, ref } from 'vue';
onMounted(() => {
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
})
onUnmounted(() => {
    window.removeEventListener('beforeprint', handleBeforePrint);
    window.removeEventListener('afterprint', handleAfterPrint);
})

const appContainer = ref<HTMLElement>();
const printing = ref<boolean>(false);
function handleBeforePrint() {
    printing.value = true;
}

function handleAfterPrint() {
    printing.value = false;
}
</script>
<template>
    <div ref="appContainer" id="application_container">
        <PrintOverlay v-if="printing" />
        <Sidebar />
        <Canvas />
    </div>
</template>
<style scoped>
#application_container {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;

    @media print{
        display: hidden;
    }
}
</style>
