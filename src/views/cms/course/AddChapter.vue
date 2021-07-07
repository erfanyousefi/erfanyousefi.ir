<template>
  <div>
    <Title title="افزودن فصل برای دوره" />
    <div>
      <div class="container-fluid">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <router-link
              :to="{ name: 'editCourse', params: { id } }"
              class="btn btn-sm btn-danger btn-icon-split"
            >
              <span class="icon text-white">
                <i class="fas fa-arrow-right"></i>
              </span>
              <span class="text">بازگشت</span>
            </router-link>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 my-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="عنوان فصل"
                  v-model="formData.title"
                />
              </div>
              <div class="col-12 my-2">
                <Button
                  :setting="{ title: 'افزودن فصل', loading, class: 'btn-dark' }"
                  @click.prevent="saveChapter"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from "@/components/partials/cms/Title.vue";
import Button from "@/components/partials/client/Button.vue";
import { reactive, ref } from "@vue/reactivity";
import { HTTP } from "@/controller/http.js";
import { onBeforeMount, watch } from "@vue/runtime-core";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    Title,
    Button,
  },
  setup() {
    const loading = ref(false);
    let formData = reactive({
      title: "",
      course: "",
    });
    let router = useRouter();
    let route = useRoute();
    let id = route.params.id;
    onBeforeMount(() => {
      formData.course = route.params.id;
      id = route.params.id
    });
    watch(formData, (value) => {
      formData.title = value.title;
    });
    const saveChapter = () => {
      loading.value = true;
      HTTP.post(`panel/course/chapter/${formData.course}`, {
        title: formData.title,
      }).then((response) => {
        loading.value = false;
        if (response.data.status) {
          Swal.fire({
            text: "افزودن فصل دوره با موفقیت انجام شد",
            icon: "success",
          }).then(() => {
            router.push({ name: "editCourse", params : {id} });
          });
        } else {
          Swal.fire({
            text: "افزودن فصل انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید",
            icon: "warning",
          });
        }
      });
    };
    return {
      loading,
      formData,
      saveChapter,
      id
    };
  },
};
</script>
<style scoped>
.invalid-feedback {
  display: block;
}
</style>
