import type { ImageElement, TextboxElement } from "@/models";
import { ref, toRef, type Ref } from "vue";
import { topLeftOffset, percentagePosition, clampPositionInContainer } from "@/utils/helpers";
import type { PixelPosition } from "@/types";
import { useActiveCanvas } from "@/composables";

type UseCanvasElementMoveConfiguration = {
    clampInContainer?: boolean,
    endMoveCallback?: (e: MouseEvent) => void
}

const defaultConfiguration = (): UseCanvasElementMoveConfiguration => ({
    clampInContainer: undefined,
    endMoveCallback: undefined,
})

export function useCanvasElementMove(
    canvasElement: ImageElement | TextboxElement, 
    elementToMove: HTMLElement | Ref<HTMLElement | undefined>,
    configuration: UseCanvasElementMoveConfiguration = defaultConfiguration(),
) {

    const moveing = ref<boolean>(false);
    const elementToMoveRef = toRef(elementToMove);
    const { canvasHTML } = useActiveCanvas();

    let offsets: PixelPosition;
    let canvasRect: DOMRect;
    function moveElement(e: MouseEvent) {
        if (!elementToMoveRef.value) throw new Error('HTMLElement to move is required');
        if (!canvasHTML.value) throw new Error('CanvasHTML is required');
        offsets = topLeftOffset(e, elementToMoveRef.value.getBoundingClientRect());
        canvasRect = canvasHTML.value.getBoundingClientRect();
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    function handleMouseMove(e: MouseEvent) {
        if (!elementToMoveRef.value) throw new Error('HTMLElement to move is required');
        let desiredAbsolutePosition: PixelPosition = { x: e.clientX - offsets.x, y: e.clientY - offsets.y }
        if (configuration.clampInContainer) desiredAbsolutePosition = clampPositionInContainer(desiredAbsolutePosition, canvasRect, elementToMoveRef.value.getBoundingClientRect())
        canvasElement.position = percentagePosition(desiredAbsolutePosition, canvasRect);
    }

    function handleMouseUp(e: MouseEvent) {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        if (configuration.endMoveCallback) configuration.endMoveCallback(e);
    }

    return {
        moveing,
        moveElement,
    }

}