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
        this._elements.push(element);
    }

    public createTextbox() {
        const element = new TextboxElement();
        element.zIndex = this._elements.length;
        this.addElement(element);
    }

    public moveElementToFront(element: ImageElement | TextboxElement) {
        this.assertElementInElementsArray(element);
        const sortedElements = this._elements.slice().sort((a, b) => a.zIndex - b.zIndex)
        
        let elementFound = false;
        for(let i = 0; i < sortedElements.length; i++) {
            if (elementFound) {
                sortedElements[i].zIndex--;
                continue;
            }
            if (sortedElements[i] === element) {
                element.zIndex = this._elements.length - 1;
                elementFound = true;
            }
        }
    }

    public removeElement(element: ImageElement | TextboxElement) {
        for(let i = 0; i < this._elements.length; i++) {
            if (this._elements[i] === element) {
                this._elements.splice(i, 1);
                this.normalizeElementsZIndexies();
            }
        }
        throw new Error('Element not found...')
    }

    private normalizeElementsZIndexies() {
        const sortedElements = this._elements.slice().sort((a, b) => a.zIndex - b.zIndex);
        for (let i = 0; i < sortedElements.length; i++) {
            sortedElements[i].zIndex = i;
        }
    }

    private assertElementInElementsArray(element: ImageElement | TextboxElement) {
        for(let i = 0; i < this._elements.length; i++) {
            if(this._elements[i] === element) return
        }
        throw new Error('Element not found...');
    }

    public toJSON() {
        return {
            color: this.color,
            elements: this._elements,
        }
    }

}