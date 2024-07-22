import { CanvasElement } from "./CanvasElement";
import { defaultTextboxData } from "@/utils/helpers";
import type { TextboxData, TextboxElementJSONData } from "@/types";

export class TextboxElement extends CanvasElement {

    private _content: TextboxData;

    constructor(content: TextboxData = defaultTextboxData()) {
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

}