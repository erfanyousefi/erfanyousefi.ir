<template>
  <div v-if="loading">
    <Loading :loading="loading" />
  </div>
  <div v-else>
    <div v-if="course">
      <Title :title="course.title" />
      <div class="row my-5">
        <div class="col-lg-4 col-md-4 col-sm-12 col-cs-12 position-relative">
          <CourseDetails :details="course" />
        </div>
        <div class="col-lg-8 col-md-8 col-sm-12 col-cs-12">
          <a
            :href="'http://localhost:3000' + course.img"
            target="_blank"
            class="course-image-index"
          >
            <img :src="'http://localhost:3000' + course.img" alt="" srcset="" />
          </a>
          <div class="card-body">
            <div class="blog-singlePage-text">
              <div v-html="course.text"></div>
            </div>
            <div class="listOfCourse"></div>
          </div>
        </div>
      </div>
      <div class="row my-3">
        <Title title="سرفصل ها و عناوین دوره" />
      </div>
      <div class="row justify-content-center my-2">
        <CourseChapter :chapters="course.chapters" />
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/partials/client/Title.vue";
import Loading from "@/components/partials/Loading.vue";
import CourseChapter from "@/components/client/course/CourseChapter.vue";
import CourseDetails from "@/components/client/course/CourseDetails.vue";
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  components: {
    Title,
    CourseChapter,
    CourseDetails,
    Loading,
  },
  setup() {
    let store = useStore();
    let route = useRoute();
    let router = useRouter();
    let slug = ref(null);
    let course = ref(null);
    let loading = ref(true);
    slug.value = route.params.slug;
    function findCourseWithSlug() {
      axios.get("http://localhost:3000/course/" + slug.value).then((response) => {
        if (response.data.course && response.data.status) {
          course.value = response.data.course;
        } else {
          Swal.fire({
            text: "دوره ای یافت نشد",
          }).then(() => {
            router.push({ name: "courses" });
          });
        }
        loading.value = false;
      });
      if (course.value) {
        loading.value = false;
      }
    }
    onBeforeMount(() => findCourseWithSlug());
    findCourseWithSlug();
    watch(() => {
      if (store.getters.getStateCourseRegister) {
        findCourseWithSlug();
        store.commit("setCourseRegisterUpdate", false);
      }
    });
    return {
      course,
      loading,
    };
  },
};
</script>

<style></style>
