import TextboxState from "../core/textbox-state";
import type { DocumentVector, CarretPosition } from "../types";
import { resolvePathToNode } from "../utils/helpers/render";
import { generateCarretElement } from "../utils/html-generators";
import Textbox from "..";

class Carret {

    private carretElement: HTMLElement;
    private rootElement: HTMLElement;
    private state: TextboxState;

    constructor (state: TextboxState) {

        this.state = state;

        const bodyElement = document.querySelector('body');

        if (!bodyElement) {
            throw new Error('No body element found, cannot instantiate carret.');
        }

        this.carretElement = generateCarretElement();
        this.rootElement = bodyElement;
        this.hide();

    }

    public render(rootElement: HTMLElement, vector: DocumentVector): void {

        const textNode = resolvePathToNode(rootElement, vector.path);
        const position = this.getCarretPosition(textNode, vector);

        const documentCarret = document.querySelector<HTMLElement>('.carret');
        if (documentCarret) {
            this.carretElement = documentCarret;
        } else {
            this.rootElement.appendChild(this.carretElement);
        }

        this.carretElement.style.left = `${position.x}px`;
        this.carretElement.style.top = `${position.y}px`;

        if (this.state.selectionFormats.title) {
            this.carretElement.style.height = `${(Textbox.fontSize * 2) + 2}px`;
        } else {
            this.carretElement.style.height = `${Textbox.fontSize + 2}px`;
        }

        this.carretElement.style.display = 'block';

    }

    public hide(): void {
        
        this.carretElement.style.display = 'none';
    
    }

    private getCarretPosition(textNode: Node, vector: DocumentVector): CarretPosition {

        // If you click on an emptynparagraph...
        if (!textNode.textContent && textNode.parentElement) {
            const parentRect = textNode.parentElement?.getBoundingClientRect();
            return { x: parentRect.right, y: parentRect.top };
        }

        const range = document.createRange();
        range.setStart(textNode, vector.index);
        range.setEnd(textNode, vector.index);
        const rect = range.getBoundingClientRect();

        return { x: rect.left, y: rect.top }

    }

}

export default Carret;