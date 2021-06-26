
<template>
  <Loading v-if="loading" />
  <div v-else>
    <Title title="همه ی مقالات" />
    <div class="row lastBlogs my-5">
      <div
        v-for:="(blog, index) in blogs"
        class="col-lg-4 col-md-6 col-sm-12 col-xs-12 my-4"
      >
        <Blog :blog="blog" />
      </div>
    </div>
  </div>
</template>

<script>
import Blog from "@/components/client/blog/Blog.vue";
import Loading from "@/components/partials/Loading.vue";
import Title from "@/components/partials/client/Title.vue";
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  components: {
    Blog,
    Loading,
    Title,
  },
  setup() {
    let blogs = ref(null);
    let json = ref(null);
    let loading = ref(true);
    const getBlog = async () => {
      json.value = await axios.get("http://localhost:3000/blogs");
      blogs.value = json.value.data.blogs;
      if (blogs.value) {
        loading.value = false;
      }
    };
    onBeforeMount(() => getBlog());
    return {
      blogs,
      loading,
    };
  },
};
</script>

<style>
</style>