<template>
  <div>
    <Title title="افزودن دوره" />
    <div>
      <div class="container-fluid">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <router-link
              :to="{ name: 'coursesList' }"
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
              <div class="col-md-6 my-3">
                <input type="text" class="form-control" placeholder="عنوان دوره" />
              </div>
              <div class="col-md-6 my-3">
                <input type="text" class="form-control" placeholder="تصویر دوره" />
              </div>
              <div class="col-md-6 my-3">
                <input type="text" class="form-control" placeholder="برچسب ها" />
              </div>
              <div class="col-md-6 my-3">
                <input type="text" class="form-control" placeholder="دسته بندی" />
              </div>
              <div class="col-12">
                <textarea
                  name=""
                  class="form-control"
                  id="editor"
                  cols="30"
                  rows="10"
                ></textarea>
                <div id="editor"></div>
              </div>
              <div class="col-12 my-2">
                <Button
                  :setting="{ title: 'افزودن دوره', loading: true, class: 'btn-dark' }"
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
import { ref } from "@vue/reactivity";
import { HTTP } from "@/controller/http.js";
export default {
  components: {
    Title,
    Button,
  },
  setup() {
    const courses = ref(null);
    const data = ref(null);
    const loading = ref(true);
    HTTP.get("panel/course/all").then((response) => {
      data.value = response.data.courses;
      courses.value = data.value;
      console.log(courses);
      if (courses.value.length > 0) {
        loading.value = false;
      }
    });
    return {
      courses,
      loading
    };
  },
};
</script>

<style></style>
