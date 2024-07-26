import { reactive, computed, ref } from "vue"

const sidebarHTML = computed(() => document.getElementById('sidebar_container'))
const sidebarCollapsed = ref<boolean>(false);
const displayDeleteSymbol = ref<boolean>(false);
const displayShilhouet = ref<boolean>(false);

export const sidebarStore = reactive({
    sidebarHTML: sidebarHTML,
    sidebarCollapsed: sidebarCollapsed,
    displayDeleteSymbol,
    displayShilhouet,
    toggleDeleteSymbol() {
        displayDeleteSymbol.value = !displayDeleteSymbol.value;
    },
    toggleSidebarCollapse() {
        sidebarCollapsed.value = !sidebarCollapsed.value;
    },
    toggleShowShilhouet() {
        displayShilhouet.value = !displayShilhouet.value;
    },
})