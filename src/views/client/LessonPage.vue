<template>
  <Loading v-if="loading" />
  <div v-else>
    <div class="row my-4">
      <Title :title="lesson.title" />
    </div>

    <div class="row my-5">
      <div class="col-lg-4 col-md-4 col-sm-12 col-cs-12 position-relative">
        <BlogInfo :blog="blog" />
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-cs-12">
        <BlogContent :blog="lesson" />
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/partials/client/Title.vue";
import BlogInfo from "@/components/client/blog/BlogInfo.vue";
import BlogContent from "@/components/client/blog/BlogContent.vue";
import Loading from "@/components/partials/Loading.vue";
import { onBeforeMount, ref, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  components: {
    Title,
    BlogInfo,
    BlogContent,
    Loading,
  },
  setup() {
    let store = useStore();
    console.log(store);
    let loading = ref(true);
    let json = ref(null);
    let lesson = ref(null);
    let blog = ref(null);
    let route = useRoute();
    let slug = ref(null);
    onBeforeMount(() => {
      slug.value = route.params.slug;
      getBlogLesson(route.params.slug);
    });
    async function getBlogLesson(slug) {
      loading.value = true;
      json.value = await (await axios.get(`http://localhost:3000/blog/lesson/${slug}`))
        .data;
      lesson.value = json.value.lesson;
      console.log(json.value);
      blog.value = json.value.blog;
      if (lesson.value && blog.value) {
        loading.value = false;
      }
    }
    watch(() => {
      console.log(route.params.slug);
      slug.value = route.params.slug;
      getBlogLesson(slug.value);
    });

    return {
      loading,
      lesson,
      blog,
    };
  },
};
</script>

<style></style>
