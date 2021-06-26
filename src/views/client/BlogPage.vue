<template>
  <Loading v-if="loading" />
  <div v-else>
    <div class="row my-4">
      <Title :title="blog.title" />
    </div>

    <div class="row my-5">
      <div class="col-lg-4 col-md-4 col-sm-12 col-cs-12 position-relative">
        <BlogInfo :blog="blog" />
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-cs-12">
        <BlogContent :blog="blog" />
      </div>
    </div>
    <BlogControls />
  </div>
</template>

<script>
import Title from "@/components/partials/client/Title.vue";
import BlogInfo from "@/components/client/blog/BlogInfo.vue";
import BlogContent from "@/components/client/blog/BlogContent.vue";
import BlogControls from "@/components/client/blog/BlogControls.vue";
import Loading from "@/components/partials/Loading.vue";
import {ref} from "vue"
export default {
  components: {
    Title,
    BlogInfo,
    BlogContent,
    Loading,
    BlogControls
  },
  setup() {
      let loading = ref(true)

      return {
          loading
      }
  }
};
</script>

<style>
</style>