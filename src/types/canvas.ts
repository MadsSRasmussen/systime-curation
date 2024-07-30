import type { ImageElement, TextboxElement } from "@/models";
import type { ParagraphObject } from "@/modules/text/types";
import type { ImageCanvasElementData } from "@/types";

export type CanvasElementPosition = {
    x: number,
    y: number
}

export type CanvasElementDimensions = {
    width: number,
    height: number,
}

type ElementJSONData = {
    zIndex: number,
    position: CanvasElementPosition,
}

export type ImageElementJSONData = {
    id: string,
    type: 'image',
    data: ImageCanvasElementData,
} & ElementJSONData

export type TextboxData = ParagraphObject[];

export type TextSize = 'small' | 'medium' | 'large';


export type TextboxElementJSONData = {
    type: 'textbox',
    data: TextboxData,
    dimensions: CanvasElementDimensions,
    color: TextboxFontColor,
    text_size: TextSize,
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

export type TextboxFontColor = 'black' | 'white' | 'gray';