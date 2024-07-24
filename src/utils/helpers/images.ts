import type { ImageRootData, SheetsApiResponse, SheetsApiResponseRow, ImageData } from "@/types";

export async function getImageData(): Promise<ImageRootData[]> {
    const endpoint = `${import.meta.env.VITE_SHEETS_URL}/gviz/tq?`;
    const response = await fetch(endpoint);
    const responseString = await response.text();

    const responseObject = resolveObj(responseString);
    const responseRows = responseObject.table.rows;

    const images: ImageRootData[] = [];
    responseRows.forEach((row) => images.push({ data: imgData(row), instantiated: false }));
    return images;
}

function resolveObj(input: string) {
    try {
        const jsonString = input.substring(47).slice(0, -2);
        return JSON.parse(jsonString) as SheetsApiResponse;
    } catch (error) {
        throw new Error('Invalid sheets api response')
    }
}

function imgData(row: SheetsApiResponseRow): ImageData {
    return {
        title: row.c[0]?.v as string,
        fileName: row.c[1]?.v as string,
        firstColumnContent: row.c[2]?.v as string,
        secondColumnContent: row.c[3]?.v,
        scale: parseFloat((row.c[4]?.v as string)),
        extraInfo: row.c[5]?.v
    }
}