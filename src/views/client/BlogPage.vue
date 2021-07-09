<template>
  <Loading v-if="loading" :loading="loading" />
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
    <div class="col-12">
      <SendComment :target="{blog : blog._id}" />
    </div>
    <div v-if="comments">
      <Title title="نظرات ثبت شده" />
      <Comment :comments="comments" />
    </div>
  </div>
</template>

<script>
import Title from "@/components/partials/client/Title.vue";
import BlogInfo from "@/components/client/blog/BlogInfo.vue";
import BlogContent from "@/components/client/blog/BlogContent.vue";
import Comment from "@/components/partials/client/Comment.vue";
import Loading from "@/components/partials/Loading.vue";
import { computed, onBeforeMount, ref, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
// import Swal from "sweetalert2";
import SendComment from "@/components/partials/client/SendComment.vue"
export default {
  components: {
    Title,
    BlogInfo,
    BlogContent,
    Loading,
    Comment,
    SendComment
  },
  setup() {
    let router = useRouter().currentRoute.value.name;
    let slug = useRoute().params.slug;
    let loading = ref(true);
    let blog = ref(null);
    let json = ref(null);
    let lesson = ref(null);
    let comments = ref(null);
    // let Toast = Swal.mixin({
    //   timerProgressBar: true,
    //   timer: 3000,
    //   position: "bottom-right",
    //   showConfirmButton: false,
    //   toast: true,
    // });
    async function getBlog() {
      json.value = await (await axios.get(`http://localhost:3000/blog/${slug}`)).data
        .blog;
      blog.value = json.value;
      if (blog.value) {
        getComments(blog.value._id);
        loading.value = false;
      }
    }
    async function getBlogSession() {
      json.value = await (await axios.get(`http://localhost:3000/blog/lesson/${slug}`))
        .data.blog;
      lesson.value = json.value;
      blog.value = lesson.value.blog;
      if (lesson.value) {
        loading.value = false;
      }
    }
    function getComments(id) {
      axios.get("http://localhost:3000/comments/" + id + "/blog").then((response) => {
        if (response.data.comments && response.data.status) {
          comments.value = response.data.comments;
        }
      });
    }

    router = computed(() => useRouter().currentRoute.value.name);
    watch(() => console.log(router));
    onBeforeMount(() => {
      if (router === "lessonPage") {
        getBlogSession();
      } else {
        getBlog();
      }
    });
    return {
      loading,
      blog,
      lesson,
      comments,
    };
  },
};
</script>

<style></style>
