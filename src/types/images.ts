export type SheetsApiResponseRow = {
    c: ({ v: string } | null)[]
}

type SheetsApiResponseColumn = {
    id: string,
    label: string,
    type: string,
    pattern?: string,
}

type SheetsApiResponseTable = {
    cols: SheetsApiResponseColumn[],
    parsedNumHeaders: number,
    rows: SheetsApiResponseRow[],
}

export type SheetsApiResponse = {
    table: SheetsApiResponseTable,
    reqId: string,
    sig: string,
    status: string,
    version: string,
}

export type ImageData = {
    scale: number,
    title: string,
    fileName: string,
    firstColumnContent: string,
    secondColumnContent?: string,
    extraInfo?: string,
}

export type ImageCanvasElementData = {
    id: string,
    filename: string,
    scale: number,
}

export type ImageRootData = {
    instantiated: boolean,
    id: string,
    data: ImageData,
}