import { onMounted, ref, toRef, nextTick, type Ref } from "vue";

export type UseClickAndDragConfiguration = {
    onClick?: (e: MouseEvent) => void,
    onDrag?: (e: MouseEvent) => void,
    onDragStart?: (e: MouseEvent) => void,
    onDragEnd?: (e: MouseEvent) => void,
}

const defaultConfiguration = (): UseClickAndDragConfiguration => ({})

export function useClickAndDrag(
    element: HTMLElement | Ref<HTMLElement | undefined>,
    configuration: UseClickAndDragConfiguration = defaultConfiguration(),
) {

    const elementRef = toRef(element);
    const dragging = ref<boolean>(false);
    const jusetEndedDrag = ref<boolean>(false);

    let latestMouseEvent: MouseEvent | null = null;

    onMounted(() => {
        if(!elementRef.value) throw new Error('Element is required');
        elementRef.value.addEventListener('mousedown', handleMouseDown);
        elementRef.value.addEventListener('click', handleClick);
    })

    function handleClick(e: MouseEvent) {
        if (jusetEndedDrag.value) {
            jusetEndedDrag.value = false;
            return;
        };
        if (configuration.onClick) configuration.onClick(e);
    }

    function handleMouseDown(e: MouseEvent) {
        document.addEventListener('mousemove', handleInitialMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    function handleInitialMouseMove(e: MouseEvent) {
        if(!elementRef.value) throw new Error('Element is required');
        if(configuration.onClick) elementRef.value.removeEventListener('click', configuration.onClick);
        document.removeEventListener('mousemove', handleInitialMouseMove);
        document.addEventListener('mousemove', handleMouseMove);
        dragging.value = true;
        if (configuration.onDragStart) configuration.onDragStart(e);
        latestMouseEvent = e;
    }

    function handleMouseMove(e: MouseEvent) {
        if (configuration.onDrag) configuration.onDrag(e);
        latestMouseEvent = e;
    }

    function handleMouseUp(e: MouseEvent) {
        if (dragging.value) {
            resetEventListeners();
            jusetEndedDrag.value = true;
            dragging.value = false;
            if(configuration.onDragEnd) configuration.onDragEnd(e);
        } else {
            resetEventListeners();
        }
        latestMouseEvent = null;
    }

    function resetEventListeners() {
        if(!elementRef.value) throw new Error('Element is required');
        document.removeEventListener('mouseup', handleMouseUp);
        if (dragging.value) {
            elementRef.value.addEventListener('click', handleClick);
            document.removeEventListener('mousemove', handleMouseMove);
        } else {
            document.removeEventListener('mousemove', handleInitialMouseMove);
        }
    }

    function endDrag() {
        if (!dragging.value) return;
        if (!latestMouseEvent) throw new Error('No latest mouse event');
        resetEventListeners();
        if (configuration.onDragEnd) configuration.onDragEnd(latestMouseEvent);
        latestMouseEvent = null;
    }

    return {
        dragging,
        endDrag,
    }

}