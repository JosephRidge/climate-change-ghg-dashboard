<script setup>
import { RouterLink, RouterView } from "vue-router";
import IconLogo from "./IconLogo.vue";
</script>

<template>
  <header>
    <nav class="my-4 mx-16 flex">
      <IconLogo class="h-fit mr-10 my-auto w-10" />
      <div class="my-auto text-green-800">
        <RouterLink
          class="hover:cursor-pointer hover:bg-green-100 mr-2 text-xl px-2 py-1 rounded-md"
          to="/"
          >Home</RouterLink
        >
        <RouterLink
          class="hover:cursor-pointer hover:bg-green-100 mr-2 text-xl px-2 py-1 rounded-md"
          to="/forest-cover"
          >Forest Cover</RouterLink
        >
        <RouterLink
          class="hover:cursor-pointer hover:bg-green-100 mr-2 text-xl px-2 py-1 rounded-md"
          to="/ghg-emissions"
          >GHG-Emissions</RouterLink
        >
      </div>
    </nav>
    <hr class="mb-10" />
  </header>
</template>

<style scoped></style>
