import type { ParagraphObject } from "../types";
import { generateInitialEmptyTextboxData } from "../utils/helpers/document";

class Document {

    public paragraphs: ParagraphObject[];

    constructor(initialData: ParagraphObject[] = []) {
        this.paragraphs = initialData.length !== 0 ? initialData : generateInitialEmptyTextboxData();
    }

    public toString(): string {
        return JSON.stringify(this);
    }
    
}

export default Document;