<template>
  <div>
    <Title title="دوره ها" />
    <div v-if="loading">
      <Loading :loading="loading" />
    </div>
    <div v-else>
      <CourseTable :courses="courses" />
    </div>
  </div>
</template>
<script>
import Loading from "@/components/partials/Loading.vue";
import Title from "@/components/partials/cms/Title.vue";
import CourseTable from "@/components/partials/cms/CourseTable.vue";
import { ref } from "@vue/reactivity";
import { HTTP } from "@/controller/http.js";
export default {
  components: {
    Title,
    CourseTable,
    Loading
  },
  setup() {
    const courses = ref(null);
    const data = ref(null);
    const loading = ref(true);
    HTTP.get("panel/course/all").then((response) => {
      data.value = response.data.courses;
      courses.value = data.value;
      console.log(courses);
      if(courses.value.length > 0){
        loading.value=false
      }
    });
    return {
      courses,
      loading
    };
  },
};
</script>

<style></style>
