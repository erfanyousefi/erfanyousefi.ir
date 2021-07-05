<template>
  <div>
    <Title title="افزودن مقاله" />
    <div class="container-fluid">
      <div class="card shadow mb-4">
        <div class="card-header blogHeader py-3">
          <router-link
            :to="{ name: 'blogsList' }"
            class="btn btn-sm btn-danger btn-icon-split"
          >
            <span class="icon text-white">
              <i class="fas fa-arrow-right"></i>
            </span>
            <span class="text">بازگشت</span>
          </router-link>
          <div>
            <button
              @click.prevent="insertChapter"
              class="btn btn-sm btn-info btn-icon-split mx-1"
            >
              <span class="icon text-white">
                <i class="fas fa-plus"></i>
              </span>
              <span class="text">افزودن فصل </span>
            </button>
            <router-link
              :to="{ name: 'addLesson', params: { id: BlogID } }"
              class="btn btn-sm btn-dark btn-icon-split mx-1"
            >
              <span class="icon text-white">
                <i class="fas fa-plus"></i>
              </span>
              <span class="text">افزودن بخش</span>
            </router-link>
          </div>
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
import { onBeforeMount, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import { HTTP } from "@/controller/http.js";
export default {
  components: {
    Title,
    EditForm,
  },
  setup() {
    let store = useStore();
    let BlogID = ref(null);
    let route = useRoute();
    BlogID.value = route.params.id;
    onBeforeMount(() => {
      BlogID.value = route.params.id;
      store.commit("setBlogId", BlogID.value);
    });
    function insertChapter() {
      Swal.fire({
        title: "افزودن فصل",
        input: "text",
        confirmButtonText: "افزودن",
        showCancelButton: true,
        cancelButtonText: "انصراف",
      }).then((dialog) => {
        if (dialog.isConfirmed) {
          HTTP.post(`panel/blog/chapter/${BlogID.value}`, { title: dialog.value }).then((chapter) => {
              if (chapter.data.status) {
                Swal.fire({
                  text: "افزودن فصل با موفقیت انجام شد",
                  icon: "success",
                });
                store.commit("setBlogChapterUpdate", true);
              } else {
                Swal.fire({
                  text: "افزودن فصل انجام نشد لطفا بعدا یا مجددا تلاش کنید",
                  icon: "warning",
                });
              }
            }
          );
        }
      });
    }
    return {
      insertChapter,
      BlogID,
    };
  },
};
</script>

<style>
.invalid-feedback {
  display: block !important;
  text-align: center;
}
.img img {
  width: 100%;
}
.blogHeader {
  display: flex;
  justify-content: space-between;
}
</style>
