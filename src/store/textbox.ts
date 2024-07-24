import { reactive, ref } from "vue";

const textboxInstantiations = ref<number>(0);

export const textboxStore = reactive({
    textboxInstantiations,
    increment() {
        textboxInstantiations.value++;
    }
})