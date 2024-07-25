<script setup lang="ts" generic="T">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { mouseOnElement } from '@/utils/helpers';

const model = defineModel<T>();

const props = defineProps<{
    data: { name: string, value: T }[]
}>();
const displayElements = ref<boolean>(false);
const selectedValueName = computed(() => {
    for(let i = 0; i < props.data.length; i++) {
        if (props.data[i].value === model.value) return props.data[i].name;
    }
    console.log(model.value);
    return 'Unknown'
})

const dropdownContainer = ref<HTMLElement>();
const dropdownElementsContainer = ref<HTMLElement>();

onMounted(() => {
    document.addEventListener('mousedown', handleMouseDown);
})
onUnmounted(() => {
    document.removeEventListener('mousedown', handleMouseDown);
})
function handleMouseDown(e: MouseEvent) {
    if (displayElements.value == false) return;
    if (!(mouseOnElement(e, dropdownContainer) || mouseOnElement(e, dropdownElementsContainer))) {
        displayElements.value = false
    }
}
</script>
<template>
    <div ref="dropdownContainer" @mousedown="(e) => { e.preventDefault() }" @click="displayElements = !displayElements" class="dropdown_container">
        <span class="selected_value_text">{{ selectedValueName }}</span>
        <div ref="dropdownElementsContainer" class="drop_down_elements_container" :class="displayElements ? 'display' : ''">
            <div @click="model = element.value" v-for="element in data" class="dropdown_element">{{ element.name }}</div>
        </div>
    </div>
</template>
<style scoped>
.selected_value_text {
    padding: 0px 5px;
}
.dropdown_container {
    width: 50px;
    height: 20px;
    position: relative;
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.dropdown_container:hover {
    background-color: var(--color-background-mute);
}
.drop_down_elements_container {
    display: none;
    position: absolute;
    background-color: white;
    width: 100%;
    top: 20px;
    z-index: 1010;
}
.drop_down_elements_container.display {
    display: block;
}
.dropdown_element {
    user-select: none;
    cursor: pointer;
    padding: 0px 5px;
}
.dropdown_element:hover {
    background-color: var(--color-background-mute);
}
</style>