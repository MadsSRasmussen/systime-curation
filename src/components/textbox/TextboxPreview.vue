<script setup lang="ts">
import type { TextboxElement } from '@/models';

defineProps<{
    textbox: TextboxElement
}>();
</script>
<template>
    {{ textbox.content }}
</template>