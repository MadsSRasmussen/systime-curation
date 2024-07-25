import { reactive, computed, ref } from "vue"

const sidebarHTML = computed(() => document.getElementById('sidebar_container'))
const sidebarCollapsed = ref<boolean>(false);
const displayDeleteSymbol = ref<boolean>(false);

export const sidebarStore = reactive({
    sidebarHTML: sidebarHTML,
    sidebarCollapsed: sidebarCollapsed,
    displayDeleteSymbol,
    toggleDeleteSymbol() {
        displayDeleteSymbol.value = !displayDeleteSymbol.value;
    },
    toggleSidebarCollapse() {
        sidebarCollapsed.value = !sidebarCollapsed.value;
    },
})