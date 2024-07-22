import type { ParagraphObject, TextObject } from "../types";

const defaultDocumentData: () => ParagraphObject[] = () => {
    
    const initialText: TextObject = {
        type: 'text',
        content: ''
    }

    const initialParagraph: ParagraphObject = {
        type: 'paragraph',
        children: [initialText]
    }

    return [initialParagraph];

}

class Document {

    public paragraphs: ParagraphObject[];

    constructor(initialData: ParagraphObject[] = []) {
        this.paragraphs = initialData.length !== 0 ? initialData : defaultDocumentData();
    }

    public toString(): string {
        return JSON.stringify(this);
    }
    
}

export default Document;