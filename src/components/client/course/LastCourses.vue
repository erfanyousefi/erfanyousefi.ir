
<template>
  <Loading v-if="loading" />
  <div v-else class="row lastPosts my-2">
    <div
      v-for:="(course, index) in courses"
      class="col-lg-4 col-md-6 col-sm-12 col-xs-12 my-4"
    >
      <Course :course="course" />
    </div>
  </div>
</template>

<script>
import Course from "@/components/client/course/Course.vue";
import Loading from "@/components/partials/Loading.vue";
import { ref } from "vue";
import axios from "axios";
export default {
  components: {
    Course,
    Loading,
  },
  setup() {
    let courses = ref(null);
    let json = ref(null);
    let loading = ref(true);
    const getCourse = async () => {
      json.value = await axios.get("http://localhost:3000/lastCourses",{ progress: false });
      courses.value = json.value.data.courses;
      if (courses.value) {
        loading.value = false;
      }
    };
    getCourse();
    return {
      courses,
      loading,
    };
  },
};
</script>

<style>
</style>