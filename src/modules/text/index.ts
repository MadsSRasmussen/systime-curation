import Document from "./models/document-model";
import DocumentOperator from "./operators/document-operator";
import TextboxState from "./core/textbox-state";
import TextboxInputHandler from "./handlers/textbox-input-handler";
import TextboxOperator from "./operators/textbox-operator";
import Carret from "./rendering/carret-renderer";
import DomRenderer from "./rendering/dom-renderer";
import type { DocumentVector, FormatFlags, ParagraphObject } from "./types";
import type { format } from "./types";

class Textbox {

    private static _fontSize: number = 16;

    static get fontSize() {
        return Textbox._fontSize;
    }

    static set fontSize(theFontSize) {
        
        Textbox._fontSize = theFontSize;
    }

    public textbox: HTMLElement;

    public document: Document;
    public carret: Carret;
    private state: TextboxState;

    private inputHandler: TextboxInputHandler;
    private documentOperator: DocumentOperator;
    private operator: TextboxOperator;
    private renderer: DomRenderer;

    constructor(textbox: HTMLElement, onFormatChange: (formats: FormatFlags) => void) {
        this.document = new Document();
        this.state = new TextboxState(onFormatChange);
        this.carret = new Carret(this.state);

        this.textbox = textbox;
        this.documentOperator = new DocumentOperator(this.document, this.state)
        this.renderer = new DomRenderer(this.document, this.documentOperator, this.textbox)
        this.operator = new TextboxOperator(this.state, this.renderer, this.carret, this.documentOperator, this.textbox);
        this.inputHandler = new TextboxInputHandler(this.textbox, this.operator);

        this.init();
    }

    private init() {
        this.renderer.render();
    }

    public updateCarret(): void {
        this.operator.updateCarret();
    }

    public format(format: format) {
        this.operator.format(format);
    }

    public getData(): ParagraphObject[] {
        return this.document.paragraphs;
    }

    public setData(data: ParagraphObject[]): void {
        this.operator.setData(data);
    }

    public getCursorVector(): DocumentVector {
        return this.state.cursor;
    }

    set fontSize(value: { normal: number, title: number}) {

        this.state.normalFontSize = value.normal;
        this.state.titleFontSize = value.title;

        this.operator.updateCarret();

    }

    get fontSize() {
        return { normal: this.state.normalFontSize, title: this.state.titleFontSize };
    }

}

export default Textbox;
export {
    DomRenderer,
}