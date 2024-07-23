import { ImageElement, TextboxElement } from "@/models";
import type { CanvasJSONData, CanvasElementJSONData } from "@/types";

export class Canvas {

    private _elements: (ImageElement | TextboxElement)[];
    private _color: string;

    constructor(elements: (ImageElement | TextboxElement)[] = [], color: string = '#FFFFFF') {
        this._elements = elements;
        this._color = color;
    }

    static fromJSON(data: CanvasJSONData) {
        const elements: (ImageElement | TextboxElement)[] = [];
        data.elements.forEach((elementData) => elements.push(
            elementData.type == 'image' ? 
            ImageElement.fromJSON(elementData) : 
            TextboxElement.fromJSON(elementData)
        ));
        return new Canvas(elements, data.color);
    }

    public get color() {
        return this._color;
    }

    public set color(theColor: string) {
        this._color = theColor;
    }

    public get elements(): (ImageElement | TextboxElement)[] {
        return this._elements;
    }

    public addElement(element: ImageElement | TextboxElement) {
        this._elements.unshift(element);
    }

    public addTextbox() {
        this.addElement(new TextboxElement);
    }

    public toJSON() {
        return {
            color: this.color,
            elements: this._elements,
        }
    }

}