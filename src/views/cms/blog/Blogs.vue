<template>
  <div>
    <Title title="افزودن مقاله" />
    <div class="container-fluid">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <router-link
            :to="{ name: 'blogsList' }"
            class="btn btn-sm btn-danger btn-icon-split"
          >
            <span class="icon text-white">
              <i class="fas fa-arrow-right"></i>
            </span>
            <span class="text">بازگشت</span>
          </router-link>
        </div>
        <div class="card-body">
          <BlogTable :blogs="blogs" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/partials/cms/Title.vue";
import BlogTable from "@/components/cms/blog/BlogTable.vue";
import {HTTP} from "@/controller/http.js"
import { ref } from '@vue/reactivity';
import { onBeforeMount } from '@vue/runtime-core';
import Swal from 'sweetalert2';
import {useRouter} from "vue-router";
export default {
  components: {
    Title,
    BlogTable,
  },
  setup() {
    let blogs = ref(null);
    let router = useRouter();
    onBeforeMount(() =>{
      HTTP.get("panel/blog/all").then(response=>{
        if(response.data.status){
          blogs.value = response.data.blogs;
        }else{
          Swal.fire({
            text : "مقاله ای  یافت نشد"
          }).then(() => router.push({name : "dashboard"}))
        }
      })
    })
    return {
      blogs
    };
  },
};
</script>

<style>
.invalid-feedback {
  display: block !important;
  text-align: center;
}
</style>
