type FileData = {
    text: () => Promise<string>
}

type FileHandle = {
    getFile: () => Promise<FileData>
}

declare global {
    interface Window {
        showOpenFilePicker: (pickerOptions: object) => Promise<[FileHandle]>;
    }
}

import { inputAsCanvasDataArray } from "./guards";
import { canvasesStore, imagesStore } from "@/store";
import { Canvas, CanvasElement } from "@/models";
const pickerOptions = {
    types: [
        {
            desctiption: "Images",
            accept: {
                "application/json": [".can"],
            },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
}

export class CanvasLoader {

    public static async loadFile() {
        const [fileHandle] = await window.showOpenFilePicker(pickerOptions);
        const fileData = await fileHandle.getFile();
        const jsonString = await fileData.text();

        const data = inputAsCanvasDataArray(JSON.parse(jsonString));

        imagesStore.markAllASUnInstantiated();

        const canvases: Canvas[] = [];
        data.forEach((jsonData) => canvases.push(Canvas.fromJSON(jsonData)));

        canvasesStore.reset(canvases);

    }

    public static downloadFile(filename: string = 'Unnamed canvas') {
        const jsonString = JSON.stringify({ application_id: import.meta.env.VITE_APPLICATION_ID, data: canvasesStore.canvases });

        const element = document.createElement('a');
        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonString));
        element.setAttribute('download', `${filename}.can`);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    public static getFileString(): string {
        return JSON.stringify({ application_id: import.meta.env.VITE_APPLICATION_ID, data: canvasesStore.canvases });
    }
}