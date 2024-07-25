import type { TextboxElement } from "@/models";
import { ref, toRef, type Ref } from "vue";
import { getRect } from "@/utils/helpers";
import { 
    clampElementDimensionsInContainer, 
    clampElementPositionTopLeftInContainer,
    clampElementPositionInContainer, 
    percentagePosition, 
    percentageDimensions, 
    absolutePosition,
    absoluteDimensions,
    absoluteOffsets,
} from "@/utils/helpers";
import { useActiveCanvas } from "./useActiveCanvas";
import type { PercentagePosition, PixelPosition } from "@/types";

export type ResizePoint = 'tl' | 'tr' | 'bl' | 'br';

export type UseTextboxElementResizeConfiguration = {
    clampInContainer?: boolean,
    endResizeCallback?: (e: MouseEvent) => void;
}

const defaultConfiguration = (): UseTextboxElementResizeConfiguration => ({});

export function useTextboxElementResize(
    element: TextboxElement,
    elementToResize: HTMLElement | Ref<HTMLElement | undefined>,
    configuration: UseTextboxElementResizeConfiguration = defaultConfiguration(),
) {
    
    const resizeing = ref<boolean>(false);
    const elementToResizeRef = toRef(elementToResize);
    const { canvasHTML } = useActiveCanvas();

    let functionOnMove: (e: MouseEvent) => void;
    let canvasRect: DOMRect | null = null;
    function resize(point: ResizePoint) {
        switch(point) {
            case 'tl':
                functionOnMove = resizeTopLeft;
                break;
            case 'tr':
                functionOnMove = resizeTopRight;
                break;
            case 'bl':
                functionOnMove = resizeBottomLeft;
                break;
            case 'br':
                functionOnMove = resizeBottomRight;
                break;
        }
        document.addEventListener('mousemove', functionOnMove);
        document.addEventListener('mouseup', handleMouseUp);
        canvasRect = getRect(canvasHTML);
        resizeing.value = true;
    }

    function resizeTopLeft(e: MouseEvent) {
        if (!canvasRect) throw new Error('No canvasRect');
        let absoluteDesiredPosition: PixelPosition = { x: e.clientX, y: e.clientY };
        if (configuration.clampInContainer) absoluteDesiredPosition = clampElementPositionTopLeftInContainer(absoluteDesiredPosition, canvasRect, getRect(elementToResizeRef));
        const relativePosition = percentagePosition(absoluteDesiredPosition, canvasRect);
        const offsets = absoluteOffsets(relativePosition, element.position);
        element.dimensions.width -= offsets.x;
        element.dimensions.height -= offsets.y;
        element.position.x = relativePosition.x;
        element.position.y = relativePosition.y;
    }

    function resizeTopRight(e: MouseEvent) {
        if (!canvasRect) throw new Error('No canvasRect');
        let absoluteDesiredPosition: PixelPosition = { x: e.clientX, y: e.clientY };
        if (configuration.clampInContainer) absoluteDesiredPosition = clampElementPositionInContainer(absoluteDesiredPosition, canvasRect);
        const relativePosition = percentagePosition(absoluteDesiredPosition, canvasRect);
        const offsets = absoluteOffsets(relativePosition, element.position);
        element.dimensions.width = offsets.x;
        element.dimensions.height -= offsets.y;
        element.position.y = relativePosition.y;
    }

    function resizeBottomLeft(e: MouseEvent) {
        if (!canvasRect) throw new Error('No canvasRect');
        let absoluteDesiredPosition: PixelPosition = { x: e.clientX, y: e.clientY };
        if (configuration.clampInContainer) absoluteDesiredPosition = {
            x: clampElementPositionTopLeftInContainer(absoluteDesiredPosition, canvasRect, getRect(elementToResizeRef)).x,
            y: clampElementPositionInContainer(absoluteDesiredPosition, canvasRect).y,
        };
        const relativePosition = percentagePosition(absoluteDesiredPosition, canvasRect);
        const offsets = absoluteOffsets(relativePosition, element.position);
        element.dimensions.width -= offsets.x;
        element.dimensions.height = offsets.y;
        element.position.x = relativePosition.x;
    }

    function resizeBottomRight(e: MouseEvent) {
        if (!canvasRect) throw new Error('No canvasRect');
        let absoluteDesiredPosition: PixelPosition = { x: e.clientX, y: e.clientY };
        if (configuration.clampInContainer) absoluteDesiredPosition = {
            y: clampElementPositionTopLeftInContainer(absoluteDesiredPosition, canvasRect, getRect(elementToResizeRef)).y,
            x: clampElementPositionInContainer(absoluteDesiredPosition, canvasRect).x,
        };
        const relativePosition = percentagePosition(absoluteDesiredPosition, canvasRect);
        const offsets = absoluteOffsets(relativePosition, element.position);
        element.dimensions.width = offsets.x;
        element.dimensions.height = offsets.y;
    }

    function handleMouseUp(e: MouseEvent) {
        document.removeEventListener('mousemove', functionOnMove);
        document.removeEventListener('mouseup', handleMouseUp);
        resizeing.value = false;
        canvasRect = null;
    }

    return {
        resizeing,
        resize,
    }

}