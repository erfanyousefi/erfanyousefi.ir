<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import("bootstrap/dist/css/bootstrap.min.css");
import("bootstrap/dist/js/bootstrap.bundle.js");
import("@/assets/dist/fonts/font-awesome/css/font-awesome.min.css");
import("x-axios-progress-bar/dist/nprogress.css");
import { useStore } from "vuex";
import { onBeforeMount } from "@vue/runtime-core";
import axios from "axios";
import dotenv from "@/dotenv.js";
export default {
  name: "App",
  components: {
  },
  setup() {
    let store = useStore();
    onBeforeMount(() => {
      let token = store.state.token;
      axios
        .post(dotenv.baseURL + "user", {
          token,
        })
        .then((response) => {
          if (response.data.user) {
            store.commit("setUser", response.data.user);
          }
        });
    });
  },
};
</script>

<style>
#app {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
}
</style>
