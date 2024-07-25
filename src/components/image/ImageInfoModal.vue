<script setup lang="ts">
import { Modal } from '@/components';
import { imagesStore } from '@/store';

const model = defineModel<boolean>();
const props = defineProps<{
    imageId: string
}>();
const data = imagesStore.getImageById(props.imageId).data;
</script>
<template>
    <Modal v-model="model">
        <div class="image_modal_content_container">
            <h3 class="modal_title">{{ data.title }}</h3>
            <div class="image_modal_image_element_container">
                <img class="image_modal_image_element" :src="`./images/${data.fileName}`">
            </div>
            <div v-if="data.extraInfo" class="image_modal_extra_info" v-html="data.extraInfo"></div>
            <div class="image_modal_text_content_container" :style="{ gridTemplateColumns: data.secondColumnContent ? '1fr 1fr' : '1fr' }">
                <div class="image_modal_text_content" v-html="data.firstColumnContent"></div>
                <div v-if="data.secondColumnContent" class="image_modal_text_content" v-html="data.secondColumnContent"></div>
            </div>
        </div>
    </Modal>
</template>
<style scoped>
.image_modal_content_container {
    width: 100%;
    padding: 0px 5px;
    display: flex;
    flex-direction: column;
    gap: 12px
}
.image_modal_image_element_container {
    display: flex;
    align-items: center;
    justify-content: center;
}
.image_modal_image_element {
    position: relative;
    width: 100%;
    max-height: 40vh;
    object-fit: contain;
}
.image_modal_text_content_container {
    display: grid;
    gap: 12px;
}
.modal_title {
    font-weight: bold;
    font-size: 24px;
    text-wrap: nowrap;
}
</style>
<style>
.image_modal_text_content_container p {
    margin-block: 1em;
}
</style>