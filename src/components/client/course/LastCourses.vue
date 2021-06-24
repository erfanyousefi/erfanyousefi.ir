
<template>
  <div class="row lastPosts my-2">
      <div v-for:="(course, index) in courses" class="col-lg-4 col-md-6 col-sm-12 col-xs-12 my-4">
          <Course :course="course" />
      </div>
  </div>
</template>

<script>
import Course from "@/components/client/course/Course.vue"
import {reactive} from "vue"
export default {
    components : {
        Course
    },
    setup(){
        const courses = reactive([
            {
                title : "آموزش صفر تا صد جاوا اسکریپت",
                type : "free",
                text : `در طی دوره آموزش جاوا اسکریپت es۷ و es۸ ما سعی داریم در چند جلسه موارد جدید از ویژگی‌های که در این ورژن از ecma script معرفی شده را به شما آموزش دهیم.`,
                tags : ["vue.js", "node.js", "nest.js", "javascript"],
                discount : 20,
                price : 150000

            },
            {
                title : "آموزش صفر تا صد جاوا اسکریپت",
                type : "cash",
                text : `در طی دوره آموزش جاوا اسکریپت es۷ و es۸ ما سعی داریم در چند جلسه موارد جدید از ویژگی‌های که در این ورژن از ecma script معرفی شده را به شما آموزش دهیم.`,
                tags : ["vue.js", "node.js", "nest.js", "javascript"],
                discount : 20,
                price : 150000

            },
            {
                title : "آموزش صفر تا صد جاوا اسکریپت",
                type : "free",
                text : `در طی دوره آموزش جاوا اسکریپت es۷ و es۸ ما سعی داریم در چند جلسه موارد جدید از ویژگی‌های که در این ورژن از ecma script معرفی شده را به شما آموزش دهیم.`,
                tags : ["vue.js", "node.js", "nest.js", "javascript"],
                discount : 20,
                price : 150000

            }
        ])
        
        return {
            courses
        }
    }
}
</script>

<style>

</style>