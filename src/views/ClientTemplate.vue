<template>
  <main id="container" class="container bg-white">
    <Header />
    <router-view></router-view>
    <MoveUp />
  </main>
</template>

<script>
import("@/assets/dist/css/style.css");
import("@/assets/dist/css/hamburger.css");
import("@/assets/dist/css/mobile.css");
// import("@/assets/dist/css/iranSans.css");
import("@/assets/dist/js/script.js");
import { loadProgressBar } from "x-axios-progress-bar";
import Header from "@/components/partials/client/Header.vue";
import MoveUp from "@/components/partials/client/MoveUp.vue";

export default {
  components: {
    Header,
    MoveUp,
  },
  setup() {
    loadProgressBar();
  },
};
</script>

<style></style>
