<template>
  <main id="page-top" dir="rtl" v-if="user">
    <div id="wrapper">
      <SideMenu />
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <TopMenu :user="user" />
          <div class="container-fluid">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import("@/assets/dist/cms/admin.css");
import SideMenu from "@/components/partials/cms/SideMenu.vue";
import TopMenu from "@/components/partials/cms/TopMenu.vue";
import("@/assets/dist/cms/vendor/fontawesome-free/css/all.min.css");
import("jquery");
import("jquery.easing");
import("@/assets/dist/cms/js/sb-admin-2.js");
import("@/assets/dist/cms/vendor/bootstrap/js/bootstrap.bundle.min.js");
import { useStore } from "vuex";
import { onBeforeMount, ref, watch } from "@vue/runtime-core";
import { HTTP } from "@/controller/http.js";
import { useRouter } from "vue-router";
import Storage from "@/controller/LocalStorage.js";
export default {
  name: "App",
  components: {
    SideMenu,
    TopMenu,
  },
  beforeRouteEnter(to, from, next) {
    let token = Storage.get("user-token");
    if (token) {
      next();
    } else {
      next({ name: "logout" });
    }
  },
  setup() {
    let store = useStore();
    let router = useRouter();
    let user = ref(null);
    function getUser() {
      let token = store.state.token;
      HTTP.post("/user", {
        token,
      }).then((response) => {
        if (response.data.user) {
          store.commit("setUser", response.data.user);
          user.value = response.data.user;
        } else {
          router.push({ name: "logout" });
        }
      });
    }
    onBeforeMount(() => getUser());
    watch(() => {
      if (store.getters.getStateUser) {
        getUser();
        store.commit("setStateUserUpdate", false);
      }
    });
    return {
      user,
    };
  },
};
</script>

<style></style>
