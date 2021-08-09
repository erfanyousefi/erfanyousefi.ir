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
          <InsertFormLesson />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/partials/cms/Title.vue";
import InsertFormLesson from "@/components/cms/blog/InsertFormLesson.vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onBeforeMount } from '@vue/runtime-core';

export default {
  components: {
    Title,
    InsertFormLesson,
  },
  setup() {
    let store = useStore();
    let router = useRouter();
    onBeforeMount(() => {
      if(!store.getters.isAdmin){
        router.push({name : "notFound"})
      }
    });
    return {};
  },
};
</script>

<style>
.invalid-feedback {
  display: block !important;
  text-align: center;
}
</style>
