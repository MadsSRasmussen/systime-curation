import { reactive, readonly } from "vue";
import type { CanvasData } from "@/types";

const state = reactive<CanvasData[]>([]);

export const canvasesState = readonly(state);