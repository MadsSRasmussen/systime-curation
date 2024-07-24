import { onMounted, onUnmounted, ref } from "vue";

export function useMousePosition() {

    const x = ref<number>(0);
    const y = ref<number>(0);

    onMounted(() => {
        document.addEventListener('mousemove', updatePosition);
    })

    onUnmounted(() => {
        document.removeEventListener('mousemove', updatePosition);
    })

    function updatePosition(e: MouseEvent) {
        x.value = e.clientX;
        y.value = e.clientY;
    }

    return {
        x,
        y
    }

}