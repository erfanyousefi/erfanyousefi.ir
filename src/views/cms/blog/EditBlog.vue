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
          <EditForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/partials/cms/Title.vue";
import EditForm from "@/components/cms/blog/EditForm.vue";
import { useRoute } from "vue-router";
import { onBeforeMount } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  components: {
    Title,
    EditForm,
  },
  setup() {
    let store = useStore();
    onBeforeMount(() => {
      let route = useRoute();
      let BlogID = route.params.id;
      store.commit("setBlogId", BlogID);
    });

    return {
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
