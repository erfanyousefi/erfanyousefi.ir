<template>
  <div v-if="loading">
    <Loading :loading="loading" />
  </div>
  <div v-else>
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
            {{ course.text }}
          </div>
          <div class="listOfCourse"></div>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <Title title="سرفصل ها و عناوین دوره" />
    </div>
    <div class="row justify-content-center my-2">
      <CourseChapter :chapters="[]" />
    </div>
  </div>
</template>

<script>
import Title from "@/components/partials/client/Title.vue";
import Loading from "@/components/partials/Loading.vue";
import CourseChapter from "@/components/client/course/CourseChapter.vue";
import CourseDetails from "@/components/client/course/CourseDetails.vue";
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
import axios from "axios";
export default {
  components: {
    Title,
    CourseChapter,
    CourseDetails,
    Loading,
  },
  setup() {
    let route = ref(null);
    let slug = ref(null);
    let course = ref(null);
    let json = ref(null);
    let loading = ref(true);
    route.value = useRoute();
    slug.value = route.value.params.slug;
    onBeforeMount(() => findCourseWithSlug());

    async function findCourseWithSlug() {
      json.value = await axios.get(
        "http://localhost:3000/course/" + slug.value
      );
      course.value = json.value.data.course;
      if (course.value) {
        loading.value = false;
      }
    }
    findCourseWithSlug();

    return {
      course,
      loading,
    };
  },
};
</script>

<style>
</style>