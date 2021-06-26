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
        <BlogContent v-if="lesson" :blog="lesson" />
        <BlogContent v-else :blog="blog" />
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
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    Title,
    BlogInfo,
    BlogContent,
    Loading,
    BlogControls,
  },
  setup() {
    let router = useRouter().currentRoute.value.name;
    let slug = useRoute().params.slug;
    let loading = ref(true);
    let blog = ref(null);
    let json = ref(null);
    let lesson = ref(null);
    console.log(router);
    async function getBlog() {
      json.value = await (
        await axios.get(`http://localhost:3000/blog/${slug}`)
      ).data.blog;
      blog.value = json.value;
      if (blog.value) {
        loading.value = false;
      }
    }
    async function getBlogSession() {
      json.value = await (
        await axios.get(`http://localhost:3000/blog/lesson/${slug}`)
      ).data.blog;
      lesson.value = json.value;
      if (lesson.value) {
        loading.value = false;
      }
    }

    onBeforeMount(() => {
      getBlog();
      if (router === "lessonPage") {
        getBlogSession();
      }
    });
    return {
      loading,
      blog,
      lesson,
    };
  },
};
</script>

<style>
</style>