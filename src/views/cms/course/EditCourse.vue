<template>
  <div v-if="formData">
    <Title title="ویرایش دوره" />
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
              <div class="col-md-12 img">
                <img :src="dotenv.baseURL+formData.img" alt="">
              </div>
              <div class="col-md-6 my-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="عنوان دوره"
                  v-model="formData.title"
                />
              </div>
              <div class="col-md-6 my-3">
                <input
                  type="file"
                  class="form-control"
                  placeholder="تصویر دوره"
                  @change="fileAttach"
                />
              </div>
              <div class="col-md-6 my-3">
                <div v-if="tags">
                  <Multiselect
                    v-model="formData.tags"
                    mode="tags"
                    :searchable="true"
                    :createTag="true"
                    :options="tags"
                    label="title"
                    placeholder="یک یا چند برچسب را انتخاب کنید"
                  />
                </div>
              </div>
              <div class="col-md-6 my-3">
                <div v-if="categories">
                  <select class="form-control" v-model="formData.category">
                    <option v-for:="category in categories" value="">
                      یک دسته بندی را انتخاب کنید
                    </option>
                    <option v-for:="category in categories" :value="category._id">
                      {{ category.title }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-4 my-3">
                <select name="type" id="" class="form-control" v-model="formData.type">
                  <option value="" selected>نوع دوره را مشخص کنید</option>
                  <option value="free">رایگان</option>
                  <option value="cash">نقدی</option>
                </select>
              </div>
              <div class="col-md-4 my-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="قیمت دوره"
                  v-model="formData.price"
                />
              </div>
              <div class="col-md-4 my-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="اعمال تخفیف"
                  v-model="formData.discount"
                />
              </div>
              <div class="col-12">
                <editor
                  api-key="kmejpui4sop678znt638riic90zeeqnseey5gun4uupeuo78"
                  v-model="formData.text"
                />
              </div>
              <div class="col-12 my-2">
                <Button
                  :setting="{ title: 'افزودن دوره', loading: false, class: 'btn-dark' }"
                  @click.prevent="saveCourse"
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
import dotenv from "@/dotenv.js";
import Title from "@/components/partials/cms/Title.vue";
import Button from "@/components/partials/client/Button.vue";
import { ref } from "@vue/reactivity";
import { HTTP } from "@/controller/http.js";
import Editor from "@tinymce/tinymce-vue";
import Multiselect from "@vueform/multiselect";
import { onBeforeMount } from "@vue/runtime-core";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
export default {
  components: {
    Title,
    Button,
    editor: Editor,
    Multiselect,
  },
  setup() {
    const course = ref(null);
    const tags = ref(null);
    const categories = ref(null);
    const loading = ref(true);
    let router = useRouter();
    let route = useRoute();
    let id = route.params.id;
    let formData = ref(null);
    let errorMessage = "";
    if (id) {
      onBeforeMount(() => {
        id = route.params.id;
        HTTP.get("panel/tag/list").then((response) => {
          tags.value = response.data.tags;
        });
        HTTP.get("panel/category/list").then((response) => {
          categories.value = response.data.categories;
        });
        HTTP.get(`panel/course/${id}`).then((response) => {
          if (response.data.status) {
            formData.value = response.data.course;
            console.log(formData);
          } else {
            router.push({ name: "coursesList" });
          }
        });
      });
    } else {
      router.push({ name: "coursesList" });
    }
    function fileAttach(event) {
      formData.img = event.target.files[0];
    }
    const saveCourse = () => {
      let data = new FormData();
      data.append("title", formData.title);
      data.append("text", formData.text);
      data.append("tags", formData.tags);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("discount", formData.discount);
      data.append("type", formData.type);
      data.append("img", formData.img);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      HTTP.post("panel/course/insertCourse", data, config).then((response) => {
        if (response.data.status) {
          Swal.fire({
            text: "افزودن دوره با موفقیت انجام شد",
            icon: "success",
          }).then(() => {
            router.push({ name: "coursesList" });
          });
        } else {
          console.log("hhh");
        }
      });
    };
    return {
      loading,
      tags,
      formData,
      categories,
      fileAttach,
      saveCourse,
      errorMessage,
      course,
      dotenv
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.invalid-feedback {
  display: block;
}
.img img{
  width : 100%;
}
</style>
