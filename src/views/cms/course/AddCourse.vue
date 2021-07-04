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
                    :options="tags"
                    label="title"
                    placeholder="یک یا چند برچسب را انتخاب کنید"
                  />
                </div>
              </div>
              <div class="col-md-6 my-3">
                <div v-if="categories">
                  <select class="form-control" v-model="formData.category">
                    <option value="">یک دسته بندی را انتخاب کنید</option>
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
                  :init="{
                    menubar: false,
                    plugins:
                      'link image emoticons a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker ',
                    toolbar:
                      'a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image emoticons',
                    toolbar_mode: 'floating',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                  }"
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
import Title from "@/components/partials/cms/Title.vue";
import Button from "@/components/partials/client/Button.vue";
import { reactive, ref } from "@vue/reactivity";
import { HTTP } from "@/controller/http.js";
import Editor from "@tinymce/tinymce-vue";
import Multiselect from "@vueform/multiselect";
import { onBeforeMount } from "@vue/runtime-core";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
export default {
  components: {
    Title,
    Button,
    editor: Editor,
    Multiselect,
  },
  setup() {
    const courses = ref(null);
    const tags = ref(null);
    const categories = ref(null);
    const loading = ref(true);
    let formData = reactive({
      title: "",
      tags: [],
      category: "",
      img: null,
      text: "",
      price: null,
      discount: null,
      type: "",
    });
    let router = useRouter();
    let errorMessage = "";
    onBeforeMount(() => {
      HTTP.get("panel/tag/list").then((response) => {
        tags.value = response.data.tags;
      });
      HTTP.get("panel/category/list").then((response) => {
        categories.value = response.data.categories;
      });
    });
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
          if (response.data.msg) {
            Object.keys(response.data.msg).forEach((key) => {
              errorMessage += response.data.msg[key] + "<br/>";
            });
            Swal.fire({
              html: errorMessage,
              icon: "warning",
            }).then(() => {
              errorMessage = "";
            });
          } else {
            Swal.fire({
              text: "افزودن دوره انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید",
              icon: "warning",
            });
          }
        }
      });
    };
    return {
      courses,
      loading,
      tags,
      formData,
      categories,
      fileAttach,
      saveCourse,
      errorMessage,
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.invalid-feedback {
  display: block;
}
</style>
