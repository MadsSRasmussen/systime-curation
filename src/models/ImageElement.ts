import { CanvasElement } from "@/models";
import { defaultCanvasElementPosition } from "@/utils/helpers";
import type { CanvasElementPosition, ImageCanvasElementData, ImageElementJSONData } from "@/types";

export class ImageElement extends CanvasElement {

    readonly data: ImageCanvasElementData;

    constructor(data: ImageCanvasElementData, position: CanvasElementPosition = defaultCanvasElementPosition(), zIndex: number = 0) {
        super(position, zIndex);
        this.data = data;
    }

    static fromJSON(imageElementData: ImageElementJSONData) {
        return new ImageElement(imageElementData.data)
    }

    public toJSON() {
        return {
            type: 'image',
            position: this.position,
            zIndex: this.zIndex,
            data: this.data,
        }
    }

}