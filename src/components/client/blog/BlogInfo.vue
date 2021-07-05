<template>
  <div class="course-details">
    <div class="courseInfo my-4">
      <a href="" class="teacher">
        <div class="">{{blog.author.name}}</div>
        <span class="teacher-details"> {{blog.author.describe}} </span>
      </a>
    </div>

    <div class="courseInfo">
      <div class="chart">
        <strong>بازدید : 140</strong>
        <strong>نظرات : 140</strong>
      </div>
    </div>
    <!-- <div class="courseInfo my-4">
      <div class="userFeedBack">
        <a href="" class="like">
          <i class="fa fa-heart-o"></i>
          <i class="fa fa-heart"></i>
        </a>
        <a href="" class="pin">
          <i class="fa fa-bookmark-o"></i>
          <i class="fa fa-bookmark"></i>
        </a>
      </div>
    </div> -->
    <div class="courseInfo my-4">
        <BlogChapters :blog="blog" />
    </div>
  </div>
</template>

<script>
import BlogChapters from "@/components/client/blog/BlogChapters.vue";
export default {
    props : {
        blog : Object
    },
    components : {
        BlogChapters
    }
};
</script>

<style>
</style>