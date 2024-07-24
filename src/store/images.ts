import type { ImageRootData } from "@/types"
import { reactive, computed } from "vue"
import { getImageData } from "@/utils/helpers";

const images = reactive<ImageRootData[]>([]);
getImageData().then((fetchedImages) => fetchedImages.forEach((image) => images.push(image)));
const imagesFetched = computed(() => images.length ? true : false)

export const imagesStore = reactive({
    images,
    imagesFetched,
    markImageAsInstantiated(id: string) {
        for(let i = 0; i < images.length; i++) {
            if (images[i].id === id) {
                images[i].instantiated = true;
                return;
            }
        }
        throw new Error(`Image with id ${id} was not found.`);
    },
    markImageAsUnInstantiated(id: string) {
        for(let i = 0; i < images.length; i++) {
            if (images[i].id === id) {
                images[i].instantiated = false;
                return;
            }
        }
        throw new Error(`Image with id ${id} was not found.`);
    },
    markAllASUnInstantiated() {
        for(let i = 0; i < images.length; i++) {
            images[i].instantiated = false;
        }
    },
});

