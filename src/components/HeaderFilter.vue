<template>
  <div class="text-lg flex items-center w-full">
    <div class="flex items-center gap-4">
      <!-- SDGs Filter -->
      <div class="relative" ref="sdgDropdownRef">
        <button
          @click="isSdgDropdownOpen = !isSdgDropdownOpen"
          class="p-1 px-4 rounded-full bg-gray-500 text-white min-w-[150px] text-left flex justify-between items-center gap-2"
        >
          <span v-html="selectedSdgsText" class="truncate"></span>
          <span>▾</span>
        </button>
        <div
          v-if="isSdgDropdownOpen"
          class="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto text-black"
        >
          <div
            v-if="selectedSdgs.length > 0"
            class="p-2 border-t border-gray-200"
          >
            <button
              @click="selectedSdgs = []"
              class="text-sm text-blue-600 hover:underline w-full text-center"
            >
              清除選擇
            </button>
          </div>

          <div
            v-for="tag in sdgOptions"
            :key="tag.value"
            class="p-2 hover:bg-gray-100"
          >
            <label class="inline-flex items-center w-full cursor-pointer">
              <input
                type="checkbox"
                :value="tag.value"
                v-model="selectedSdgs"
                class="h-5 w-5 text-green-600 rounded focus:ring-green-500 border-gray-300"
              />
              <span class="ml-3 text-gray-700" v-html="tag.title"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Time Filter -->
      <div class="relative" ref="timeDropdownRef">
        <button
          @click="isTimeDropdownOpen = !isTimeDropdownOpen"
          class="p-1 px-4 rounded-full bg-gray-500 text-white min-w-[150px] text-left flex justify-between items-center gap-2"
        >
          <span>{{ timeFilterText }}</span>
          <span>▾</span>
        </button>
        <div
          v-if="isTimeDropdownOpen"
          class="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg text-black"
        >
          <div
            @click="setTimeFilter('all')"
            class="cursor-pointer p-2 hover:bg-gray-100"
          >
            全部時間
          </div>
          <div
            @click="setTimeFilter('day')"
            class="cursor-pointer p-2 hover:bg-gray-100"
          >
            最近一天
          </div>
          <div
            @click="setTimeFilter('week')"
            class="cursor-pointer p-2 hover:bg-gray-100"
          >
            最近一周
          </div>
          <div
            @click="setTimeFilter('custom')"
            class="cursor-pointer p-2 hover:bg-gray-100"
          >
            自訂範圍
          </div>
        </div>
      </div>

      <!-- Custom Date Range -->
      <div
        v-if="timeFilter === 'custom'"
        class="flex gap-2 items-center text-black bg-white/50 p-2 rounded-lg"
      >
        <input
          type="date"
          v-model="customStartDate"
          class="p-1 border rounded-md"
        />
        <span class="text-gray-600">至</span>
        <input
          type="date"
          v-model="customEndDate"
          class="p-1 border rounded-md"
        />
      </div>
    </div>
    <!-- Keyword Filter -->
    <div class="relative ml-auto">
      <input
        type="text"
        v-model="keyword"
        placeholder="搜尋標題..."
        class="p-1 px-4 rounded-full border border-black/50 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
      />
      <a
        v-if="keyword.length"
        href="#"
        class="absolute right-2 top-1.5"
        @click.prevent="keyword = ''"
      >
        <i class="fa-solid fa-xmark text-black/50"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits } from "vue";
import typeTags from "@/data/SDGs_goal.json";
import { useClickOutside } from "@/composables/useClickOutside.js";

// Filter states
const selectedSdgs = ref([]);
const isSdgDropdownOpen = ref(false);
const timeFilter = ref("all");
const isTimeDropdownOpen = ref(false);
const customStartDate = ref("");
const customEndDate = ref("");
const keyword = ref("");

// Template refs for dropdowns
const sdgDropdownRef = ref(null);
const timeDropdownRef = ref(null);

// Close dropdowns when clicking outside
useClickOutside(sdgDropdownRef, () => {
  isSdgDropdownOpen.value = false;
});
useClickOutside(timeDropdownRef, () => {
  isTimeDropdownOpen.value = false;
});

const emits = defineEmits(["update:filters"]);

const sdgOptions = computed(() => typeTags.filter((t) => t.value !== 0));

const selectedSdgsText = computed(() => {
  if (selectedSdgs.value.length === 0) {
    return "SDGs";
  }
  if (selectedSdgs.value.length > 1) {
    return `SDGs (${selectedSdgs.value.length})`;
  }
  const tag = typeTags.find((t) => t.value === selectedSdgs.value[0]);
  return tag ? tag.title.replace(/<br\s*\/?>/g, " ") : "SDGs";
});

const timeFilterText = computed(() => {
  switch (timeFilter.value) {
    case "day":
      return "最近一天";
    case "week":
      return "最近一周";
    case "custom":
      return "自訂範圍";
    default:
      return "發布時間";
  }
});

function setTimeFilter(filter) {
  timeFilter.value = filter;
  isTimeDropdownOpen.value = false;
  if (filter !== "custom") {
    customStartDate.value = "";
    customEndDate.value = "";
  }
}

watch(
  [selectedSdgs, timeFilter, customStartDate, customEndDate, keyword],
  () => {
    emits("update:filters", {
      sdgs: selectedSdgs.value,
      time: timeFilter.value,
      startDate: customStartDate.value,
      endDate: customEndDate.value,
      keyword: keyword.value,
    });
  },
  { deep: true, immediate: true }
);
</script>
