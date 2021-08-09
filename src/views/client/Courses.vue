<template>
<div v-if="loading">
  <Loading :loading="loading" />
</div>
  <div v-else>
    <Title title="همه دوره ها" />
    <div class="row lastPosts my-2">
      <div
        v-for:="(course, index) in courses" v-if="courses.length > 0"
        class="col-lg-4 col-md-6 col-sm-12 col-xs-12 my-4"
      >
        <Course :course="course" />
      </div>
      <div v-else class="col-12">
        <div class="alert alert-warning">
          دوره ای یافت نشد
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/partials/client/Title.vue";
import Course from "@/components/client/course/Course.vue";
import Loading from "@/components/partials/Loading.vue";
import { ref } from "vue";
import axios from "axios";
export default {
  components: {
    Title,
    Course,
    Loading
  },
  setup() {
    const courses = ref(null);
    let json = ref(null);
    let loading = ref(true)
    const getCourses = async () => {
      json.value = await (
        await axios.get("http://localhost:3000/courses")
      ).data.courses;
      courses.value = json.value;
      if (courses.value) {
        loading.value = false;
      }
    };
    getCourses();
    return {
      courses,
      loading
    };
  },
};
</script>

<style>
</style>