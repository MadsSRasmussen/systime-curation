import TextboxState from "../core/textbox-state.js";
import Carret from "../rendering/carret-renderer.js";
import DomRenderer from "../rendering/dom-renderer.js";
import type { DocumentVector, ParagraphObject, Format } from "../types.js";
import DocumentOperator from "./document-operator.js";

import type { SelectionRange } from "../types.js";

import { selectionIsWithinElement } from "../utils/guards.js";
import { resolveNodeToPath, resolvePathToNode } from "../utils/helpers/render.js";

class TextboxOperator {

    private state: TextboxState;
    private domRenderer: DomRenderer;
    private carret: Carret;
    private documentOperator: DocumentOperator;
    private textboxElement: HTMLElement;

    constructor(state: TextboxState, domRenderer: DomRenderer, carret: Carret, documentOperator: DocumentOperator, textboxElement: HTMLElement) {
        this.state = state;
        this.domRenderer = domRenderer;
        this.carret = carret;
        this.documentOperator = documentOperator;
        this.textboxElement = textboxElement;
    }

    public updateCarret(): void {

        if (!this.state.selectionRange) {
            this.state.selectionFormats = this.documentOperator.getFormats(this.state.cursor);
            this.carret.render(this.textboxElement, this.state.cursor);
        } else {
            this.carret.hide();
        }
        
    }

    public updateSelectionState(selection: Selection): void {

        if (!selectionIsWithinElement(selection, this.textboxElement)) {
            return;
        }

        switch(selection.type) {
            case 'Caret':
                this.updateSelectionStateCaret(selection);
                break;
            case 'Range':
                this.updateSelectionStateRange(selection);
                break;
        }

    }

    private setDomSelection(range: SelectionRange): void {

        const firstNode = resolvePathToNode(this.textboxElement, range.start.path);
        const lastNode = resolvePathToNode(this.textboxElement, range.end.path);

        const domRange = new Range();
        domRange.setStart(firstNode, range.start.index);
        domRange.setEnd(lastNode, range.end.index);

        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(domRange);

    }

    private updateSelectionStateCaret(selection: Selection): void {

        const anchorNode = selection.anchorNode;

        if (!anchorNode) {
            return;
        }

        if (anchorNode instanceof Text) {
            const resultingVector: DocumentVector = {
                path: resolveNodeToPath(this.textboxElement, anchorNode),
                index: selection.anchorOffset
            }
            this.state.cursor = resultingVector;
        } else {
            const path = resolveNodeToPath(this.textboxElement, anchorNode);
            const resultingVector: DocumentVector = this.documentOperator.getTrailingNodeVector(path);
            this.state.cursor = resultingVector;
        }

        this.state.selectionRange = null;

    }

    private updateSelectionStateRange(selection: Selection): void {

        const range = selection.getRangeAt(0);

        let startVector: DocumentVector;
        let endVector: DocumentVector;

        if (range.startContainer instanceof Text) {
            startVector = { 
                path: resolveNodeToPath(this.textboxElement, range.startContainer),
                index: range.startOffset
            }
        } else {
            const path = resolveNodeToPath(this.textboxElement, range.startContainer);
            startVector = this.documentOperator.getTrailingNodeVector(path);
        }

        if (range.endContainer instanceof Text) {
            endVector = {
                path: resolveNodeToPath(this.textboxElement, range.endContainer),
                index: range.endOffset
            };
        } else {
            const path = resolveNodeToPath(this.textboxElement, range.startContainer);
            endVector = this.documentOperator.getTrailingNodeVector(path);
        }

        this.state.selectionRange = {
            start: startVector,
            end: endVector
        }

        const formatFlags = this.documentOperator.getFormatsSelection(this.state.selectionRange);
        this.state.selectionFormats = formatFlags;

    }

    // Collapses DOM - Range if any is present
    private removeSelection() {

        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);

        if (range) {
            range.collapse();
        }

    }

    public hideCarret(): void {
        this.carret.hide();
    }

    public moveCarretLeft(): void {
        this.state.selectionRange = null;
        this.removeSelection();
        this.state.cursor = this.documentOperator.getPreviousVector(this.state.cursor);
        this.updateCarret();
    }

    public moveCarretRight(): void {
        this.state.selectionRange = null;
        this.removeSelection();
        this.state.cursor = this.documentOperator.getNextVector(this.state.cursor);
        this.updateCarret();
    }

    // Inserts a string, also single characters, function is called on regular kydown events
    public insertText(text: string): void {

        if (this.state.selectionRange) {
            this.backspace();
        }
        this.state.cursor = this.documentOperator.insertText(text, this.state.cursor);
        this.domRenderer.textNodeRender(this.state.cursor);
        this.updateCarret();
    }

    // Inserts paragraph
    public insertParagraph(): void {

        if (this.state.selectionRange) {

            const { newVector, latestChangedPath } = this.documentOperator.removeSelection(this.state.selectionRange);
            this.state.cursor = newVector;
            this.state.selectionRange = null;

        }

        this.state.cursor = this.documentOperator.insertParagraph(this.state.cursor);
        this.domRenderer.render();
        this.updateCarret();
    }

    // Deletes character or paragraph depending on state.cursor.index
    public backspace(): void {

        if (this.state.selectionRange) {

            const { newVector, latestChangedPath } = this.documentOperator.removeSelection(this.state.selectionRange);
            this.state.cursor = newVector;
            this.state.selectionRange = null;
            this.domRenderer.renderFromPath(latestChangedPath);
            this.updateCarret();
            return;

        } else {
            
            const { newVector, latestChangedPath } = this.documentOperator.deleteSingle(this.state.cursor);
            this.state.cursor = newVector;
            this.domRenderer.renderFromPath(latestChangedPath);
            this.updateCarret();
            return;
        
        }


    }

    public format(format: Format) {

        if (this.state.selectionRange) {

            if (this.state.selectionFormats[format] == true) {
                
                // undoFormatSelection
                const { range, cursorPosition } = this.documentOperator.undoFormatSelection(this.state.selectionRange, format);
                this.state.selectionRange = range;
                this.state.cursor = cursorPosition;
                this.domRenderer.render();

                this.setDomSelection(this.state.selectionRange);

            } else {

                // insertFormatSelection
                const { range, cursorPosition } = this.documentOperator.insertFormatSelection(this.state.selectionRange, format);
                this.state.selectionRange = range;
                this.state.cursor = cursorPosition;
                this.domRenderer.render();

                this.setDomSelection(this.state.selectionRange);
            
            }
            return;
        }
        
        if (this.state.selectionFormats[format] == true) {
            this.state.cursor = this.documentOperator.undoFormat(this.state.cursor, format);
        } else {
            this.state.cursor = this.documentOperator.insertFormat(this.state.cursor, format);
        }

        this.domRenderer.render();
        this.updateCarret();

    }

    public setData(data: ParagraphObject[]) {

        const { firstVector } = this.documentOperator.setData(data);
        this.state.cursor = firstVector;
        this.state.selectionRange = null;
        this.domRenderer.render();
        this.updateCarret();

    }

}

export default TextboxOperator;