import { CanvasElement } from "@/models";
import { defaultCanvasElementPosition } from "@/utils/helpers";
import type { CanvasElementPosition, ImageCanvasElementData, ImageElementJSONData } from "@/types";
import { imagesStore } from "@/store";

export class ImageElement extends CanvasElement {

    readonly data: ImageCanvasElementData;

    constructor(data: ImageCanvasElementData, id: string, position: CanvasElementPosition = defaultCanvasElementPosition(), zIndex: number = 0) {
        super(position, zIndex, id);
        this.data = data;
        imagesStore.markImageAsInstantiated(data.id);
    }

    static fromJSON(imageElementData: ImageElementJSONData) {
        return new ImageElement(imageElementData.data, imageElementData.id, imageElementData.position, imageElementData.zIndex);
    }

    public toJSON(): ImageElementJSONData {
        return {
            type: 'image',
            position: this.position,
            zIndex: this.zIndex,
            data: this.data,
            id: this.id,
        }
    }

}