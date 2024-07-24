<script setup lang="ts">
import { Sidebar, Canvas } from '@/components';
</script>
<template>
    <div id="application_container">
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
}
</style>
