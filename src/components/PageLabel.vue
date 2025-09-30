<template>
  <div v-if="totalPages >= 1" class="text-base md:text-[1.6rem]">
    <button
      @click="prevPage"
      :disabled="modelValue === 1"
      class="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
    >
      上一頁
    </button>
    <span>第 {{ modelValue }} / {{ totalPages }} 頁</span>
    <button
      @click="nextPage"
      :disabled="modelValue === totalPages"
      class="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
    >
      下一頁
    </button>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 6,
  },
  modelValue: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const totalPages = computed(() => {
  if (props.totalItems === 0) return 1;
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

const nextPage = () => {
  if (props.modelValue < totalPages.value) {
    emits("update:modelValue", props.modelValue + 1);
  }
};

const prevPage = () => {
  if (props.modelValue > 1) {
    emits("update:modelValue", props.modelValue - 1);
  }
};
</script>
<style scoped>
</style>