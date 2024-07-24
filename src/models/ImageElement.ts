import { CanvasElement } from "@/models";
import { defaultCanvasElementPosition } from "@/utils/helpers";
import type { CanvasElementPosition, ImageCanvasElementData, ImageElementJSONData } from "@/types";
import { imagesStore } from "@/store";

export class ImageElement extends CanvasElement {

    readonly data: ImageCanvasElementData;

    constructor(data: ImageCanvasElementData, id: string, position: CanvasElementPosition = defaultCanvasElementPosition(), zIndex: number = 0) {
        super(position, zIndex, id);
        this.data = data;
        console.log(data);
        imagesStore.markImageAsInstantiated(data.id);
    }

    static fromJSON(imageElementData: ImageElementJSONData) {
        return new ImageElement(imageElementData.data, imageElementData.id);
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