import { reactive, readonly } from "vue";

const state = reactive({
    fontSize: 0,
    sidebarCollapsed: false,
})
const sessionState = readonly(state);

export const sessionStore = {
    session: sessionState,
    setFontSize(size: number) {
        state.fontSize = size;
    },
    toggleSidebarCollapse() {
        state.sidebarCollapsed = !state.sidebarCollapsed;
    },
}