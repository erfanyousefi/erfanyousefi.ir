<template>
  <div>
    <Title title="افزودن مقاله" />
    <div class="container-fluid">
      <div class="card shadow mb-4">
        <div class="card-header blogHeader py-3">
          <router-link
            :to="{ name: 'editBlog', params : {id : blogID} }"
            class="btn btn-sm btn-danger btn-icon-split"
          >
            <span class="icon text-white">
              <i class="fas fa-arrow-right"></i>
            </span>
            <span class="text">بازگشت</span>
          </router-link>
          
        </div>
        <div class="card-body">
          <LessonEditForm @blogID="emitValue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/partials/cms/Title.vue";
import LessonEditForm from "@/components/cms/blog/LessonEditForm.vue";
import { ref } from '@vue/reactivity';
// import { useRoute } from "vue-router";
// import { onBeforeMount } from "@vue/runtime-core";
// import { useStore } from "vuex";

export default {
  components: {
    Title,
    LessonEditForm,
  },
  setup() {

    let  blogID = ref(null)
    function emitValue(id){
      blogID.value = id
    }
    return {
      blogID,
      emitValue
    };
  },
};
</script>

<style>
.invalid-feedback {
  display: block !important;
  text-align: center;
}
.img img{
  width : 100%;
}

</style>
