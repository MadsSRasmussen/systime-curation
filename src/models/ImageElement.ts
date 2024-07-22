import { CanvasElement } from "@/models";
import type { ImageData, ImageElementJSONData } from "@/types";

export class ImageElement extends CanvasElement {

    readonly data: ImageData;

    constructor(data: ImageData) {
        super();
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
            data: ImageData,
        }
    }

}