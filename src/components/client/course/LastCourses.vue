
<template>
  <div class="row lastPosts my-2">
      <div v-for:="(course, index) in courses" class="col-lg-4 col-md-6 col-sm-12 col-xs-12 my-4">
          <Course :course="course" />
      </div>
  </div>
</template>

<script>
import Course from "@/components/client/course/Course.vue"
import {ref} from "vue";
import axios from "axios";
export default {
    components : {
        Course
    },
    setup(){
        let courses = ref(null)
        let json = ref(null)
        const getCourse = async () => {
            json.value =  await axios.get("http://localhost:3000/lastCourses");
            courses.value = json.value.data.courses
        }
        getCourse()
        console.log(courses);
        return {
            courses,

        }
    }
}
</script>

<style>

</style>