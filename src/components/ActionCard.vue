<template>
  <div v-bind="$attrs">
    <div
      class="bg-gradient-to-r from-gray-800/40 to-gray-400/20 backdrop-blur-sm animate-fade-in-up cursor-pointer w-full md:max-w-7xl md:max-h-95 rounded-xl hover:shadow-focus overflow-hidden flex flex-col md:flex-row hover:scale-105"
      v-for="info in filteredInfo"
      :key="info.id"
      @click="goToActions(info.id)"
    >
      <div class="w-full md:w-2/5 flex items-end justify-center md:justify-end">
        <img
          src="@/assets/images/draw_wall.jpg"
          alt="Card Image"
          class="w-full h-full object-cover object-center rounded-xl"
        />
      </div>
      <div
        class="p-4 md:p-10 flex flex-col justify-center w-full md:flex-1 text-sm md:text-lg"
      >
        <h2 class="text-xl md:text-2xl mb-2 md:mb-2">主題：{{ info.title }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <p class="mb-2">
            時間 ：{{
              info.startTime && info.endTime
                ? new Date(info.startTime * 1000).toLocaleDateString() +
                  " ~ " +
                  new Date(info.endTime * 1000).toLocaleDateString()
                : "無"
            }}
          </p>
          <p class="text-md mb-2">成員：{{ info.group }}</p>
          <p class="text-md mb-2 md:col-span-2">描述 ：{{ info.intro }}</p>
          <div class="flex items-center w-full md:w-70 gap-3 md:col-span-2">
            進度：
            <!-- Progress Bar -->
            <div
              class="relative flex-1 bg-gray-200 rounded-full h-2 overflow-hidden"
            >
              <div
                class="h-2 rounded-full transition-all duration-500"
                :class="progressColor(info.progress)"
                :style="{ width: info.progress + '%' }"
              ></div>
            </div>
            <!-- Percentage Number -->
            <span class="w-10 text-sm text-gray-700 text-left">
              {{ info.progress }}%
            </span>
          </div>
          <div class="flex flex-wrap gap-2 mt-2 md:col-span-2">
            <span
              v-for="t in info.types"
              :key="t"
              class="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
            >
              {{ typeTags[t].title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

import typeTags from "@/data/SDGs_goal.json";

const props = defineProps({
  filteredInfo: {
    type: Array,
    default: () => [],
  },
});

const progressColor = (progress) => {
  if (progress < 40) return "bg-red-500";
  if (progress < 70) return "bg-yellow-400";
  return "bg-green-500";
};
const goToActions = (id) => {
  router.push({ name: "action-detail", params: { id } });
};
</script>
<style scoped>
</style>
