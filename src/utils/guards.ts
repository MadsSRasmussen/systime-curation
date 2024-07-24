import type { CanvasJSONData } from "@/types";

export function inputAsCanvasDataArray(input: any): CanvasJSONData[] {

    if (!(input instanceof Object)) {
        throw new Error('Invalid JSON structure');
    }

    input = returnWithTypeProperty(input);

    try {
        if (input.application_id === import.meta.env.VITE_APPLICATION_ID) {
            return input.data as CanvasJSONData[]
        } else {
            throw new Error('Invalid curation id');
        }
    } catch (error) {
        throw new Error('Invalid JSON structure');
    }

}

function returnWithTypeProperty(input: any): ({ application_id: string } & Record<string, any>) {
    return input as ({ application_id: string } & Record<string, any>)
}