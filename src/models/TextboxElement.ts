import { CanvasElement } from "./CanvasElement";
import type { TextboxData, TextboxElementJSONData, CanvasElementPosition, CanvasElementDimensions, TextboxFontColor } from "@/types";
import { defaultCanvasElementPosition, defaultCanvasElementDimensions, numberIsInRange } from "@/utils/helpers";
import { generateInitialEmptyTextboxData } from "@/modules/text/utils/helpers/document";
import { textboxStore } from "@/store";

export class TextboxElement extends CanvasElement {

    private _content: TextboxData;
    private _dimensions: CanvasElementDimensions;
    public color: TextboxFontColor;
    public largeText: boolean;

    constructor(
        content: TextboxData = generateInitialEmptyTextboxData(), 
        position: CanvasElementPosition = defaultCanvasElementPosition(),  
        dimensions: CanvasElementDimensions = defaultCanvasElementDimensions(), 
        zIndex: number = 0, 
        color: TextboxFontColor = 'black',
        largeText: boolean = false,
    ) {
        super(position, zIndex, `T${textboxStore.textboxInstantiations + 1}`);
        textboxStore.increment();
        this._content = content;
        this._dimensions = dimensions;
        this.color = color;
        this.largeText = largeText;
    }

    static fromJSON(textboxElementData: TextboxElementJSONData) {
        return new TextboxElement(
            textboxElementData.data, 
            textboxElementData.position, 
            textboxElementData.dimensions, 
            textboxElementData.zIndex,
            textboxElementData.color,
            textboxElementData.large_text,
        );
    }

    public get content() {
        return this._content;
    }

    public set content(theContent: TextboxData) {
        this._content = theContent;
    }

    public get dimensions() {
        return this._dimensions;
    }

    public set dimensions(theDimensions: CanvasElementDimensions) {
        if (!(numberIsInRange(theDimensions.width, 0, 1) && numberIsInRange(theDimensions.height, 0, 1))) throw new Error('Invalid dimensions value');
        this._dimensions = theDimensions;
    }

    public toJSON(): TextboxElementJSONData {
        return {
            type: 'textbox',
            data: this._content,
            zIndex: this.zIndex,
            position: this.position,
            dimensions: this._dimensions,
            color: this.color,
            large_text: this.largeText,
        }
    }

}