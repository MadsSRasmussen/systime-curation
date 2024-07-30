import type { TextSize } from "@/types";
import type { DocumentVector, FormatFlags, SelectionRange, Format } from "../types";

class TextboxState {

    public cursor: DocumentVector;
    public selectionRange: SelectionRange | null;
    public normalFontSize: number;
    public titleFontSize: number;
    private _selectionFormats: FormatFlags;
    private formats: Format[];
    private onFormatChange: (formats: FormatFlags) => void;
    public textSize: TextSize;

    constructor(onFormatChange: (formats: FormatFlags) => void) {
        this.cursor = {
            path: [0, 0],
            index: 0
        }
        this.selectionRange = null;
        this._selectionFormats = {
            strong: false,
            em: false,
            u: false,
            title: false,
        }
        this.formats = Object.keys(this._selectionFormats) as Format[];
        this.onFormatChange = onFormatChange;
        this.onFormatChange(this._selectionFormats);

        this.normalFontSize = 18;
        this.titleFontSize = 27;
        this.textSize = 'small';
    }

    set selectionFormats(value: FormatFlags) {

        for (let i = 0; i < this.formats.length; i++) {

            if (value[this.formats[i]] !== this._selectionFormats[this.formats[i]]) {
                this._selectionFormats = value;
                this.onFormatChange(this._selectionFormats);
                return;
            }

        }

    }

    get selectionFormats(): FormatFlags {
        return this._selectionFormats;
    }

    public getSelectionFormatsArray(): Format[] {
        return (Object.keys(this._selectionFormats) as Format[]).filter(format => this._selectionFormats[format] == true);
    }

}

export default TextboxState;