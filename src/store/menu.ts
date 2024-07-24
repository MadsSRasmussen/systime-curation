import { reactive, computed, ref } from "vue"

const menuHTML = computed(() => document.getElementById('sidebar_container'))
const menuCollapsed = ref<boolean>(false);
const displayDeleteSymbol = ref<boolean>(false);

export const menuStore = reactive({
    menuHTML,
    menuCollapsed,
    displayDeleteSymbol,
    toggleDeleteSymbol() {
        displayDeleteSymbol.value = !displayDeleteSymbol.value;
    },
})