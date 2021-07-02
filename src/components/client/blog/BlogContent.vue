<template>
  <div>
    <a href="" target="_blank" class="course-image-index">
      <img :src="dotenv.baseURL + blog.img" alt="" srcset="" />
    </a>
    <div class="card-body">
      <div class="blog-singlePage-text">
        {{ blog.text }}
      </div>
    </div>
  </div>
</template>

<script>
import dotenv from "@/dotenv.js";
export default {
  props: { 
    blog: Object 
  },
  setup() {
    return {
      dotenv
    }
  }
};
</script>

<style>
</style>