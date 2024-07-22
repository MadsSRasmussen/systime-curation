import type { ImageElement, TextboxElement } from "@/models";

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

export type TextboxData = object[];

export type TextboxElementJSONData = {
    type: 'textbox',
    data: TextboxData,
} & ElementJSONData

export type CanvasElementJSONData = ImageElementJSONData | TextboxElementJSONData;

export type CanvasData = {
    color: string,
    elements: (ImageElement | TextboxElement)[]
}