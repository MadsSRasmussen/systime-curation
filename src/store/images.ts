import type { ImageRootData } from "@/types"
import { reactive, computed } from "vue"
import { getImageData } from "@/utils/helpers";

const images = reactive<ImageRootData[]>([]);
getImageData().then((fetchedImages) => fetchedImages.forEach((image) => images.push(image)));
const imagesFetched = computed(() => images.length ? true : false)

export const imagesStore = reactive({
    images,
    imagesFetched,
});

