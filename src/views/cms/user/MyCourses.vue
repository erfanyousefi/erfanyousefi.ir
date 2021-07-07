<template>
  <div class="row">
    <Title title="دوره های که در آنها شرکت کرده اید" />
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
          <table>
            <thead></thead>
            <tfoot></tfoot>
            <tbody>
              <tr v-if="user.courses.length == 0">
                <td>شما در هیچ دوره ای ثبت نام نکرده اید. <a :href="dotenv.clientURL+'courses'" target="_blank">مشاهده همه دوره ها</a></td>
              </tr>
              <tr v-else v-for:="(course, key) in user.courses"></tr>
            </tbody>
          </table>
        </div>
      </template>
    </CardBody>
  </div>
</template>

<script>
import Title from "@/components/partials/cms/Title.vue";
import Loading from "@/components/partials/Loading.vue";
import dotenv from "@/dotenv.js";
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import CardBody from "@/components/partials/cms/CardBody.vue";
export default {
  components: {
    Loading,
    Title,
    CardBody,
  },
  setup() {
    let store = useStore();
    let loading = ref(true);
    let user = ref(null);
    function getUser() {
      user.value = store.state.user;
      loading.value = false;
    }
    onBeforeMount(() => {
      getUser();
    });
    return {
      user,
      loading,
      dotenv
    };
  },
};
</script>

<style></style>
