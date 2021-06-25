
<template>
  <div class="row lastBlogs my-2">
    <div v-for:="(blog, index) in blogs" class="col-lg-4 col-md-6 col-sm-12 col-xs-12 my-5">
      <Blog :blog="blog" />
    </div>
  </div>
</template>

<script>
import Blog from "@/components/client/blog/Blog.vue";
import { reactive } from "vue";
export default {
  components: {
    Blog,
  },
  setup() {
    const blogs = reactive([
      {
        title: "آموزش صفر تا صد جاوا اسکریپت",
        type: "free",
        text: `در طی دوره آموزش جاوا اسکریپت es۷ و es۸ ما سعی داریم در چند جلسه موارد جدید از ویژگی‌های که در این ورژن از ecma script معرفی شده را به شما آموزش دهیم.`,
        tags: ["vue.js", "node.js", "nest.js", "javascript"],
        createdAt : "1400/10/14",
        author : "عرفان یوسفی"
      },
      {
        title: "آموزش صفر تا صد جاوا اسکریپت",
        type: "cash",
        text: `در طی دوره آموزش جاوا اسکریپت es۷ و es۸ ما سعی داریم در چند جلسه موارد جدید از ویژگی‌های که در این ورژن از ecma script معرفی شده را به شما آموزش دهیم.`,
        tags: ["vue.js", "node.js", "nest.js", "javascript"],
        createdAt : "1400/10/14",
        author : "عرفان یوسفی"
      },
      {
        title: "آموزش صفر تا صد جاوا اسکریپت",
        type: "free",
        text: `در طی دوره آموزش جاوا اسکریپت es۷ و es۸ ما سعی داریم در چند جلسه موارد جدید از ویژگی‌های که در این ورژن از ecma script معرفی شده را به شما آموزش دهیم.`,
        tags: ["vue.js", "node.js", "nest.js", "javascript"],
        createdAt : "1400/10/14",
        author : "عرفان یوسفی"
      },
    ]);

    return {
      blogs,
    };
  },
};
</script>

<style>
</style>