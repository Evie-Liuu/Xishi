<template>
  <div class="page-background content-scroller h-screen flex flex-col">
    <header class="pt-25 w-full shadow-md z-10 bg-header text-rice-500">
      <div class="container mx-auto flex items-center p-4">
        <div class="w-1/3">
          <router-link to="/" class="back-home-btn">
            <span class="text">回首頁</span>
            <span class="icon">←</span>
          </router-link>
        </div>
        <div class="w-1/3 text-center">
          <h1 class="text-2xl md:text-3xl font-bold">成果展示</h1>
        </div>
        <div class="w-1/3"></div>
      </div>
    </header>
    <main
      class="grid grid-cols-1 md:grid-cols-4 gap-11 p-4 md:p-20 md:px-70 pt-10 text-center text-3xl md:min-h-220"
    >
      <div
        class="relative group col-span-1 md:col-span-3 h-48 md:h-auto border-4 border-orange-default p-4 bg-[url(@/assets/images/flower.jpg)] bg-cover bg-top overflow-hidden flex items-center justify-center animate-fade-in-left animate-delay-100 text-white text-shadow-3d shadow-[0px_12px_5px_5px_rgba(0,0,0,0.45)] rounded-4xl"
      >
        <div class="absolute inset-0 bg-black/40"></div>
        數據呈現
      </div>
      <div
        class="relative group col-span-1 h-48 md:h-auto border-4 border-orange-default p-4 bg-[url(@/assets/images/flower.jpg)] bg-cover bg-top overflow-hidden flex items-center justify-center animate-fade-in-left animate-delay-200 text-white text-shadow-3d shadow-[12px_12px_5px_5px_rgba(0,0,0,0.45)] rounded-4xl"
      >
        <div class="absolute inset-0 bg-black/40"></div>
        下載資源
      </div>

      <router-link
        class="relative group col-span-1 md:col-span-4 h-48 md:h-auto border-4 border-orange-default p-4 bg-[url(@/assets/images/flower.jpg)] bg-cover bg-center overflow-hidden flex items-center justify-center animate-fade-in-left animate-delay-300 shadow-[12px_12px_5px_5px_rgba(0,0,0,0.45)] hover:font-bold text-white text-shadow-3d rounded-4xl"
        to="/story"
      >
        <div
          class="absolute inset-0 bg-black/40 lg:group-hover:hidden hidden lg:block"
        ></div>
        故事牆</router-link
      >
    </main>
  </div>
</template>
<script setup>
</script>
<style scoped>
</style>