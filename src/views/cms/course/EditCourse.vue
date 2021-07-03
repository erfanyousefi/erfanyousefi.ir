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
            <div>
              <router-link
                :to="{ name: 'addChapter', params: { id } }"
                class="btn btn-sm btn-info btn-icon-split mx-1"
              >
                <span class="icon text-white">
                  <i class="fas fa-plus"></i>
                </span>
                <span class="text">افزودن فصل</span>
              </router-link>
              <router-link
                :to="{ name: 'addEpisode' }"
                class="btn btn-sm btn-dark btn-icon-split mx-1"
              >
                <span class="icon text-white">
                  <i class="fas fa-plus"></i>
                </span>
                <span class="text">افزودن اپیزود</span>
              </router-link>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12 img">
                <img :src="dotenv.baseURL + formData.img" alt="" />
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
              <div class="col-12 my-3">
                <editor
                  api-key="kmejpui4sop678znt638riic90zeeqnseey5gun4uupeuo78"
                  v-model="formData.text"
                />
              </div>
              <div class="col-md-12 my-3">
                <ChapterList :chapters="formData.chapters" />
              </div>
              <div class="col-12 my-2">
                <Button
                  :setting="{ title: 'ویرایش دوره', loading, class: 'btn-dark' }"
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
import { onBeforeMount, watch } from "@vue/runtime-core";
import Swal from "sweetalert2";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import ChapterList from "@/components/cms/course/ChapterList.vue";
import { useStore } from "vuex";
export default {
  components: {
    Title,
    Button,
    editor: Editor,
    Multiselect,
    ChapterList,
  },
  setup() {
    let store = useStore();
    const course = ref(null);
    const tags = ref(null);
    const categories = ref(null);
    const loading = ref(false);
    let router = useRouter();
    let route = useRoute();
    let id = route.params.id;
    let formData = ref(null);
    let errorMessage = "";
    watch(() => {
      console.log("hello");
      id = route.params.id;
      if (store.state.chapterUpdated) {
        HTTP.get(`panel/course/${id}`).then((response) => {
          if (response.data.course) {
            formData.value = response.data.course;
            store.commit("setChapterUpdate", false);
          }else{
            Swal.fire("دوره ای یافت نشد").then(() =>
              router.push({ name: "coursesList"})
            );
          }
        });
      }
    });
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
          if (response.data.course) {
            formData.value = response.data.course;
            console.log(formData);
          } else {
            Swal.fire("دوره ای یافت نشد").then(() =>
              router.push({ name: "coursesList"})
            );
          }
        });
      });
      onBeforeRouteUpdate(() => {
        id = route.params.id;
        HTTP.get(`panel/course/${id}`).then((response) => {
          if (response.data.status) {
            formData.value = response.data.course;
            console.log(formData);
          } else {
            Swal.fire("دوره ای یافت نشد").then(() =>
              router.push({ name: "coursesList"})
            );
          }
        });
      });
    } else {
      router.push({ name: "coursesList" });
    }
    function fileAttach(event) {
      formData.value.img = event.target.files[0];
    }
    const saveCourse = () => {
      loading.value = true;
      let data = new FormData();
      data.append("title", formData.value.title);
      data.append("text", formData.value.text);
      data.append("tags", formData.value.tags);
      data.append("category", formData.value.category);
      data.append("price", formData.value.price);
      data.append("discount", formData.value.discount);
      data.append("type", formData.value.type);
      data.append("img", formData.value.img);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      HTTP.put(`panel/course/${formData.value._id}`, data, config).then((response) => {
        if (response.data.status) {
          loading.value = false;
          Swal.fire({
            text: "ویرایش دوره با موفقیت انجام شد",
            icon: "success",
          }).then(() => {
            router.push({ name: "coursesList" });
          });
        } else {
          Swal.fire({
            text: "ویرایش دوره انحام نشد لطفا بعدا تلاش کنید",
            icon: "error",
          });
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
      dotenv,
      id,
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.invalid-feedback {
  display: block;
}
.img img {
  width: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
}
</style>
