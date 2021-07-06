<template>
  <div class="row">
    <Title title="کاربران" />
    <CardBody>
      <template v-slot:title>
        <router-link
          :to="{ path: '/dashboard' }"
          class="btn btn-sm btn-danger btn-icon-split"
        >
          <span class="icon text-white">
            <i class="fas fa-arrow-right"></i>
          </span>
          <span class="text">بازگشت</span>
        </router-link>
      </template>
      <template v-slot:card>
        <div class="row" v-if="loading">
          <Loading :loading="loading" />
        </div>
        <div v-else>
          <div v-if="users">
            <UserTable :users="users" />
          </div>
        </div>
      </template>
    </CardBody>
  </div>
</template>

<script>
import UserTable from "@/components/cms/user/UserTable.vue";
import Title from "@/components/partials/cms/Title.vue";
import Loading from "@/components/partials/Loading.vue";
import { onBeforeMount, ref, watch } from "@vue/runtime-core";
import { HTTP } from "@/controller/http.js";
import Swal from "sweetalert2";
import { useStore } from "vuex";
import CardBody from "@/components/partials/cms/CardBody.vue";
export default {
  components: {
    UserTable,
    Loading,
    Title,
    CardBody,
  },
  setup() {
    let store = useStore();
    let loading = ref(true);
    let users = ref(null);
    function getUser() {
      HTTP.get("panel/user/list").then((response) => {
        if (response.data.users) {
          users.value = response.data.users;
        } else {
          Swal.fire("کاربری یافت نشد");
        }
        loading.value = false;
      });
    }
    onBeforeMount(() => {
      getUser();
    });
    watch(() => {
      if (store.getters.getStateUserList) {
        getUser();
        store.commit("setUserListUpdate", false);
      }
    });
    return {
      users,
      loading,
    };
  },
};
</script>

<style></style>
