import Textbox from "@/modules/text";
import { onMounted, toRef, ref, onBeforeUnmount } from "vue";
import type { Ref } from "vue";
import type { TextboxElement } from "@/models";
import type { FormatFlags } from "@/modules/text/types";

export function useTextboxData(textboxElement: TextboxElement, textboxHTML: HTMLElement | Ref<HTMLElement | undefined>) {

    textboxHTML = toRef(textboxHTML)
    
    const bold = ref<boolean>(false);
    const italic = ref<boolean>(false);
    const underline = ref<boolean>(false);
    const title = ref<boolean>(false);
    
    let textbox: Textbox;
    onMounted(() => {
        if (!textboxHTML.value) throw new Error('No Textbox HTML element');
        textbox = new Textbox(textboxHTML.value, handleFormatFlagsChange, textboxElement.content);
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

    return {
        bold,
        italic,
        underline,
        title,
        saveData,
    }

}