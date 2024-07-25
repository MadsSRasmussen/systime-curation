// Datasctructure types:
export type command = 'bold' | 'itallic' | 'underline' | 'insertParagraph' | 'deleteChatacter';

export type Format = 'strong' | 'em' | 'u' | 'title';

export type FormatFlags = Record<Format, boolean>;

export type TextObject = {
    type: 'text';
    content: string;
}

export type FormatObject = {
    type: 'format';
    format: Format;
    children: [FormatObject | TextObject, ...(FormatObject | TextObject)[]];
}

export type ParagraphObject = {
    type: 'paragraph';
    children: [FormatObject | TextObject, ...(FormatObject | TextObject)[]];
}

export type DocumentVector = {
    path: number[];
    index: number;
}

export type CarretPosition = {
    x: number,
    y: number,
}

export type SelectionRange = {
    start: DocumentVector,
    end: DocumentVector
}