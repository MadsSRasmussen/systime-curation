import type { ImageRootData, SheetsApiResponse, SheetsApiResponseRow, ImageData, PixelDimensions, NormalizedDimensions } from "@/types";

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
        id: row.c[0]?.v as string,
        title: row.c[1]?.v as string,
        fileName: row.c[2]?.v as string,
        firstColumnContent: row.c[3]?.v as string,
        secondColumnContent: row.c[4]?.v,
        scale: parseFloat((row.c[5]?.v as string)),
        extraInfo: row.c[6]?.v
    }
}

export async function getImageDimensions(src: string): Promise<PixelDimensions> {
    return await new Promise((resolve, reject) => {
        try {
            const image = new Image();
            image.onload = () => {            
                resolve({
                    width: image.naturalWidth,
                    height: image.naturalHeight
                })
            }
            image.src = src;
        } catch (error) {
            reject(error);
        }
    })
}

export function normalizeDimensions(dimensions: PixelDimensions, area: number = 100): NormalizedDimensions {
    const k = Math.sqrt((100 / (dimensions.width * dimensions.height)));
    return ({ width: dimensions.width * k, height: dimensions.height * k});
}