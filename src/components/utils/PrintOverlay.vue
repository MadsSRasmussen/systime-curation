<template>
    <div class="overlay_backdrop">

    </div>    
</template>
<style scoped>
.overlay_backdrop {
    background-color: rgb(248, 248, 248);
    flex-grow: 1;
    z-index: 102;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;

    @media print {
        visibility: hidden;
    }
}
</style>