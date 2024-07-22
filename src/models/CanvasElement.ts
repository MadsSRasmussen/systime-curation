import type { CanvasElementPosition, CanvasElementJSONData } from "@/types";
import { defaultCanvasElementPosition, numberIsInRange } from "@/utils/helpers";
import { ImageElement, TextboxElement } from "@/models";

export class CanvasElement {

    private _position: CanvasElementPosition;
    private _zIndex: number;

    constructor(position: CanvasElementPosition = defaultCanvasElementPosition(), zIndex: number = 0) {
        this._position = position;
        this._zIndex = zIndex;
    }

    static fromJSON(data: CanvasElementJSONData) {
        return data.type === 'image' ? ImageElement.fromJSON(data) : TextboxElement.fromJSON(data);
    }

    public get position() {
        return this._position;
    }

    public set position(thePosition: CanvasElementPosition) {
        if (!(numberIsInRange(thePosition.x, 0, 1) && numberIsInRange(thePosition.y, 0, 1))) throw new Error('Invalid position value');
        this._position = thePosition;
    }

    public get zIndex() {
        return this._zIndex;
    }

    public set zIndex(theZIndex: number) {
        if (!numberIsInRange(theZIndex, 0, 100)) throw new Error('Invalid zIndex value');
        this._zIndex = theZIndex;
    }

}