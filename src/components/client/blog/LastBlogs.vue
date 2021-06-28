
<template>
  <Loading v-if="loading"  :loading="loading"/>
  <div v-else class="row lastBlogs my-2">
    <div
      v-for:="(blog, index) in blogs"
      class="col-lg-4 col-md-6 col-sm-12 col-xs-12 my-5"
    >
      <Blog :blog="blog" />
    </div>
  </div>
</template>

<script>
import Blog from "@/components/client/blog/Blog.vue";
import Loading from "@/components/partials/Loading.vue";
import { onBeforeMount, ref } from "vue";
import axios from "axios"
import dotenv from "@/dotenv.js"
export default {
  components: {
    Blog,
    Loading
  },
  setup() {
    let blogs = ref(null);
    let loading = ref(true);
    let json = ref(null);
    const getBlogs = async () => {
      json.value = await axios.get(`${dotenv.baseURL}lastBlogs`,{progress: false})
      blogs.value = json.value.data.blogs;
      if (blogs.value) {
        loading.value = false;
      }
    };
    onBeforeMount(() => {
      getBlogs();
    });

    return {
      blogs,
      loading,
    };
  },
};
</script>

<style>
</style>