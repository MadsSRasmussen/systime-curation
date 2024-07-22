import { CanvasElement } from "./CanvasElement";
import type { TextboxData, TextboxElementJSONData } from "@/types";
import { generateInitialEmptyTextboxData } from "@/modules/text/utils/helpers/document";

export class TextboxElement extends CanvasElement {

    private _content: TextboxData;

    constructor(content: TextboxData = generateInitialEmptyTextboxData()) {
        super();
        this._content = content;
    }

    static fromJSON(textboxElementData: TextboxElementJSONData) {
        return new TextboxElement(textboxElementData.data);
    }

    public get content() {
        return this._content;
    }

    public set content(theContent: TextboxData) {
        this._content = theContent;
    }

    public toJSON(): TextboxElementJSONData {
        return {
            type: 'textbox',
            data: this._content,
            zIndex: this.zIndex,
            position: this.position,
        }
    }

}