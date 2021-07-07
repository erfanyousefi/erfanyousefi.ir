<template>
  <div>
    <Title title="دوره ها" />
    <CardBody>
      <template v-slot:title>
        <div class="courseTable ">
          <h6 class="m-0 font-weight-bold text-primary">لیست دوره ها</h6>
          <router-link
            :to="{ name: 'addCourse' }"
            class="btn btn-sm btn-primary btn-icon-split"
          >
            <span class="icon text-white">
              <i class="fas fa-plus"></i>
            </span>
            <span class="text">افزودن دوره</span>
          </router-link>
        </div>
      </template>
      <template v-slot:card>
        <div v-if="loading">
          <Loading :loading="loading" />
        </div>
        <div v-else>
          <CourseTable v-if="courses" :courses="courses" />
        </div>
      </template>
    </CardBody>
  </div>
</template>
<script>
import Loading from "@/components/partials/Loading.vue";
import Title from "@/components/partials/cms/Title.vue";
import CourseTable from "@/components/cms/course/CourseTable.vue";
import CardBody from "@/components/partials/cms/CardBody.vue";
import { ref } from "@vue/reactivity";
import { HTTP } from "@/controller/http.js";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { watch } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  components: {
    Title,
    CourseTable,
    CardBody,
    Loading,
  },
  setup() {
    let store = useStore();
    let router = useRouter();
    const courses = ref(null);
    const data = ref(null);
    const loading = ref(true);
    HTTP.get("panel/course/all").then((response) => {
      data.value = response.data;
      if (data.value.statusCode === 403) {
        Swal.fire({
          text: "شما ابتدا باید وارد حساب کاربری خود شوید",
          icon: "warning",
        }).then(() => {
          router.push({ name: "loginPage" });
        });
      } else {
        courses.value = data.value.courses;
        if (courses.value.length > 0) {
          loading.value = false;
        }
      }
    });
    watch(() => {
      if (store.getters.getStateCourseList) {
        HTTP.get("panel/course/all").then((response) => {
          store.commit("setCourseListUpdate", false);
          data.value = response.data;
          if (data.value.statusCode === 403) {
            Swal.fire({
              text: "شما ابتدا باید وارد حساب کاربری خود شوید",
              icon: "warning",
            }).then(() => {
              router.push({ name: "loginPage" });
            });
          } else {
            courses.value = data.value.courses;
            if (courses.value.length > 0) {
              loading.value = false;
            }
          }
        });
      }
    });
    return {
      courses,
      loading,
    };
  },
};
</script>

<style></style>
