<template>
  <main
    :class="[
      'relative h-screen w-screeen flex flex-col justify-center items-center lg:gap-8 bg-[url(\'@/assets/images/Mobile/Mobile_Background.png\')] bg-cover bg-center overflow-hidden lg:bg-[url(\'@/assets/images/Web_Background.png\')]',
      'transition-all duration-2000 ease-out',
    ]"
  >
    <!-- School Logo -->
    <div class="absolute w-full h-full top-0 left-0">
      <img
        src="@/assets/images/Web_ChangAn_Logo.png"
        class="hidden lg:block absolute w-full h-full top-0 left-0 object-cover object-center pointer-events-none select-none"
        alt="Changan_logo"
      />
      <img
        src="@/assets/images/Mobile/Mobile_ChangAn_Logo.png"
        class="block lg:hidden absolute w-full h-full top-0 left-0 object-cover object-center pointer-events-none select-none"
        alt="Changan_logo"
      />
    </div>

    <!-- Cover -->
    <section class="flex-shrink-0 z-50">
      <div
        :class="[
          'transition-all duration-3000 ease-out',
          isLoaded ? 'opacity-100' : 'opacity-0',
          shouldMoveUp ? 'lg:h-140' : 'lg:h-0',
        ]"
        class="flex items-center justify-center lg:pt-8 lg:max-w-290 lg:-translate-y-35"
      >
        <img
          :src="IceCreamMelting"
          class="pointer-events-none select-none"
          alt="Changan_cover"
        />
        <!-- <img
          :src="IceCreamMelting_mobile"
          class="block lg:hidden pointer-events-none select-none"
          alt="Changan_cover"
        /> -->
      </div>
    </section>
    <!-- School Title -->
    <section class="z-50">
      <div
        :class="[
          'transition-all duration-3000 ease-out',
          isLoaded ? 'opacity-100' : 'opacity-0',
        ]"
        class="lg:max-w-180 flex items-center justify-center lg:justify-start"
      >
        <img
          src="@/assets/images/ChangAn_School_title.png"
          class="pointer-events-none select-none"
          alt="Changan_cover"
        />
      </div>
    </section>
    <!-- Menu Buttons -->
    <section
      class="h-full flex items-center justify-center font-bold text-green-dark translate-y-0 2xl:-translate-y-4 z-50"
    >
      <div
        :class="[
          'transition-all duration-3000 ease-out',
          isLoaded ? 'opacity-100' : 'opacity-0',
        ]"
        class="flex flex-col pt-4 lg:flex-row lg:gap-20 items-center justify-center text-xl lg:text-2xl lg:p-0 lg:pb-25"
      >
        <router-link
          to="/about"
          class="relative"
          @mouseover="hoveredIndex = 0"
          @mouseleave="hoveredIndex = null"
        >
          <img
            :src="hoveredIndex === 0 ? button1Selected : buttonUnselected"
            class="pointer-events-none select-none w-48 lg:w-60"
            alt="Button_1"
          />
          <span
            class="absolute inset-0 flex items-center justify-center tracking-widest -translate-y-3.5 lg:-translate-y-4"
            >校園探索</span
          >
        </router-link>
        <router-link
          to="/actions"
          class="relative -translate-y-5 lg:translate-y-0"
          @mouseover="hoveredIndex = 1"
          @mouseleave="hoveredIndex = null"
          ><img
            :src="hoveredIndex === 1 ? button2Selected : buttonUnselected"
            class="pointer-events-none select-none w-48 lg:w-60"
            alt="Button_2"
          />
          <span
            class="absolute inset-0 flex items-center justify-center tracking-widest -translate-y-3.5 lg:-translate-y-4"
            >SDGs行動</span
          ></router-link
        >
        <router-link
          to="/sdgs"
          class="relative -translate-y-10 lg:translate-y-0"
          @mouseover="hoveredIndex = 2"
          @mouseleave="hoveredIndex = null"
          ><img
            :src="hoveredIndex === 2 ? button3Selected : buttonUnselected"
            class="pointer-events-none select-none w-48 lg:w-60"
            alt="Button_3"
          />
          <span
            class="absolute inset-0 flex items-center justify-center tracking-widest -translate-y-3.5 lg:-translate-y-4"
            >SDGs成果</span
          ></router-link
        >
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref, onMounted } from "vue";
import IceCreamMelting from "@/assets/images/Earth_IceCream.webp";
import buttonUnselected from "@/assets/images/Bar_Unselected.png";
import button1Selected from "@/assets/images/Bar_Selected_School.png";
import button2Selected from "@/assets/images/Bar_Selected_Action.png";
import button3Selected from "@/assets/images/Bar_Selected_Result.png";

const hoveredIndex = ref(null);
const isLoaded = ref(false);
const shouldMoveUp = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
    // 延遲一點時間後開始向上移動動畫
    setTimeout(() => {
      shouldMoveUp.value = true;
    }, 500);
  }, 100);
});
</script>
<style scoped>
</style>
