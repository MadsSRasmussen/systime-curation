import Textbox from "@/modules/text";
import { onMounted, toRef, ref, onBeforeUnmount } from "vue";
import type { Ref } from "vue";
import type { TextboxElement } from "@/models";
import type { FormatFlags, Format } from "@/modules/text/types";
import { useActiveCanvas } from "./useActiveCanvas";

export function useTextboxData(textboxElement: TextboxElement, textboxHTML: HTMLElement | Ref<HTMLElement | undefined>) {

    textboxHTML = toRef(textboxHTML)
    
    const bold = ref<boolean>(false);
    const italic = ref<boolean>(false);
    const underline = ref<boolean>(false);
    const title = ref<boolean>(false);

    const { canvas } = useActiveCanvas();
    
    let textbox: Textbox;
    onMounted(() => {
        if (!textboxHTML.value) throw new Error('No Textbox HTML element');
        canvas.value.moveElementToFront(textboxElement);
        textbox = new Textbox(textboxHTML.value, handleFormatFlagsChange);
        textbox.setData(textboxElement.content);
        textbox.textbox.focus();
    })
    onBeforeUnmount(saveData);

    function handleFormatFlagsChange(formats: FormatFlags) {
        bold.value = formats.strong;
        italic.value = formats.em;
        underline.value = formats.u;
        title.value = formats.title
    }

    function saveData() {
        textboxElement.content = textbox.getData();
    }

    function format(format: Format) {
        textbox.format(format)
    }

    return {
        bold,
        italic,
        underline,
        title,
        format,
        saveData,
    }

}