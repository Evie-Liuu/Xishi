<template>
  <div
    class="page-background content-scroller h-screen flex flex-col"
    @scroll="handleAppScroll"
  >
    <header class="relative z-5 pt-25 w-full shadow-md bg-header text-rice-500">
      <div class="container mx-auto flex items-center p-4">
        <div class="w-1/3">
          <router-link to="/sdgs" class="back-home-btn">
            <span class="text">回上頁</span>
            <span class="icon">←</span>
          </router-link>
        </div>
        <div class="w-1/3 text-center">
          <h1 class="text-2xl md:text-3xl font-bold">故事牆</h1>
        </div>
        <div class="w-1/3 flex items-center justify-end pr-4 gap-2">
          <!-- <router-link v-if="isTeacher" to="/story/new" title="建立新故事"> -->
          <!-- <router-link to="/story/new" title="建立新故事">
            <div
              class="w-10 h-10 bg-orange-300 rounded-full flex items-center justify-center text-white cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              <i class="fa-solid fa-plus font-bold text-pblue-500"></i>
            </div>
          </router-link> -->
        </div>
      </div>
    </header>
    <main class="p-10 flex flex-col justify-center items-center gap-8">
      <HeaderFilter
        @update:filters="handleFilterUpdate"
        class="flex flex-wrap justify-center items-center gap-4 md:px-50"
      ></HeaderFilter>
      <section
        class="grid grid-cols-1 md:grid-cols-3 content-center justify-items-center gap-5 p-4 md:p-0"
      >
        <div
          class="animate-fade-in-up cursor-pointer w-80 min-h-80 bg-white rounded-xl shadow-md overflow-hidden flex flex-col gap-5 hover:scale-105"
          v-for="info in allFilteredInfos"
          :key="info.id"
          @click="goToStory(info.id)"
        >
          <img
            src="@/assets/images/scene.jpg"
            alt="Card Image"
            class="h-45 object-cover"
          />
          <div class="p-4 flex flex-col justify-center">
            <h2 class="text-xl font-bold mb-2">{{ info.title }}</h2>
            <p class="text-gray-600 text-sm">{{ info.intro }}</p>
            <p class="text-gray-600 text-sm text-right pe-3">更多</p>
          </div>
        </div>
      </section>
      <div
        v-if="allFilteredInfos.length === 0"
        class="text-center text-gray-500 mt-8"
      >
        <p>找不到符合條件的行動。</p>
      </div>
      <PageLabel
        class="flex justify-center items-center gap-4 mt-8"
        :totalItems="allFilteredInfos.length"
        :itemsPerPage="itemsPerPage"
        v-model="currentPage"
      ></PageLabel>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, inject, onBeforeMount, watch } from "vue";
import sdgsData from "@/data/SDGs_goal.json";
import infosData from "@/data/Story.json";

import HeaderFilter from "@/components/HeaderFilter.vue";
import { useClickOutside } from "@/composables/useClickOutside.js";
// import { useDateFormat } from "@/composables/useDateFormat.js";
// import { useAuth } from "@/stores/auth";
// import { apiService } from "@/services/api.js";

// const { isTeacher, user, isAuthenticated } = useAuth();
// const { formatDate } = useDateFormat();

const handleAppScroll = inject("handleAppScroll");

const allInfos = ref(infosData);

// --- Filter Logic ---
const filters = ref({
  sdgs: [],
  time: "all",
  startDate: "",
  endDate: "",
  keyword: "",
});
const currentPage = ref(1);
const itemsPerPage = 6;

const handleFilterUpdate = (newFilters) => {
  filters.value = newFilters;
  currentPage.value = 1; // Reset page when filters change
};

const allFilteredInfos = computed(() => {
  let result = allInfos.value;

  // Filter by SDGs
  if (filters.value.sdgs.length > 0) {
    result = result.filter(
      (info) =>
        info.types &&
        info.types.some((type) => filters.value.sdgs.includes(type))
    );
  }

  // Filter by time
  if (filters.value.time !== "all") {
    const now = new Date();
    result = result.filter((info) => {
      if (!info.time || String(info.time).trim() === "") return false;
      const infoDate = new Date(Number(info.time) * 1000);

      if (filters.value.time === "day") {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        return infoDate >= yesterday;
      } else if (filters.value.time === "week") {
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        return infoDate >= lastWeek;
      } else if (
        filters.value.time === "custom" &&
        filters.value.startDate &&
        filters.value.endDate
      ) {
        const start = new Date(filters.value.startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(filters.value.endDate);
        end.setHours(23, 59, 59, 999);
        return infoDate >= start && infoDate <= end;
      }
      return true; // Should not happen if time is not 'all', but as a fallback
    });
  }

  // Filter by keyword
  if (filters.value.keyword) {
    result = result.filter((info) =>
      info.title.toLowerCase().includes(filters.value.keyword.toLowerCase())
    );
  }

  return result;
});

const path = "../assets/images/";

const goToStory = (id) => {
  //   router.push({ name: "story-detail", params: { id } });
};
</script>
<style scoped></style>