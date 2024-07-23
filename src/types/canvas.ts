import type { ImageElement, TextboxElement } from "@/models";
import type { ParagraphObject } from "@/modules/text/types";

export type CanvasElementPosition = {
    x: number,
    y: number
}

export type ImageData = object;

type ElementJSONData = {
    zIndex: number,
    position: CanvasElementPosition,
}

export type ImageElementJSONData = {
    type: 'image',
    data: ImageData,
} & ElementJSONData

export type TextboxData = ParagraphObject[];

export type TextboxElementJSONData = {
    type: 'textbox',
    data: TextboxData,
} & ElementJSONData

export type CanvasElementJSONData = ImageElementJSONData | TextboxElementJSONData;

export type CanvasData = {
    color: string,
    elements: (ImageElement | TextboxElement)[]
}

export type CanvasJSONData = {
    color: string,
    elements: CanvasElementJSONData[]
}

export type FileJSONData = {
    application_id: string,
    data: CanvasJSONData[],
}