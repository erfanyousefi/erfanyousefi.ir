<template>
  <div>
    <a href="" target="_blank" class="course-image-index">
      <img :src="'http://localhost:3000' + blog.img" alt="" srcset="" />
    </a>
    <div class="card-body">
      <div class="blog-singlePage-text">
        {{ blog.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { 
    blog: Object 
  },
};
</script>

<style>
</style>