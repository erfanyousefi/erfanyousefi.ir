<template>
  <div>
    <Title title="افزودن " />
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
              <div class="col-md-6 my-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="شماره ویدئو"
                  v-model="formData.number"
                />
              </div>
              <div class="col-md-6 my-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="عنوان ویدئو"
                  v-model="formData.title"
                />
              </div>
              <div class="col-md-6 my-3">
                <select class="form-select" v-model="formData.type">
                  <option value="">نوع دسترسی ویدئو را مشخص کنید</option>
                  <option value="free">رایگان</option>
                  <option value="cash">نقدی</option>
                </select>
              </div>
              <div class="col-md-6 my-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="مدت زمان ویدئو با فرمت hh:mm:ss"
                  v-model="formData.time"
                />
              </div>
              <div class="col-md-6 my-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="لینک دانلود ویدئو"
                  v-model="formData.file"
                />
              </div>
              <div class="col-md-6 my-3">
                <select class="form-select" v-model="formData.chapter">
                  <option selected value="">فصل مربوطه را انتخاب کید</option>
                  <option
                    v-for:="(chapter, key) in chapters"
                    :key="key"
                    :value="chapter._id"
                  >
                    {{ chapter.title }}
                  </option>
                </select>
              </div>
              <div class="col-12 my-2">
                <Button
                  :setting="{ title: 'افزودن فصل', loading, class: 'btn-dark' }"
                  @click.prevent="saveEpisode"
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
import Button from "@/components/partials/client/Button";
import Title from "@/components/partials/cms/Title";
import { onBeforeMount, reactive, ref, watch } from "vue";
import { HTTP } from "@/controller/http.js";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
export default {
  components: {
    Button,
    Title,
  },
  setup() {
    let route = useRoute();
    let router = useRouter();
    let id = route.params.id;
    let chapters = ref(null);
    let loading = ref(false);
    onBeforeMount(() => {
      HTTP.get(`panel/course/chapters/${id}`).then((response) => {
        if (response.data.status) {
          chapters.value = response.data.chapters;
        } else {
          Swal.fire("دوره ای یافت نشد").then(() =>
            router.push({ name: "editCourse", params: { id } })
          );
        }
      });
    });
    let formData = reactive({
      title: "",
      number: "",
      type: "",
      file: "",
      time: "",
      chapter: "",
    });
    watch(formData, (value) => {
      formData.title = value.title;
      formData.time = value.time;
      formData.type = value.type;
      formData.number = value.number;
      formData.file = value.file;
      formData.chapter = value.chapter;
    });
    function saveEpisode() {
      loading.value = true;
      if (formData.chapter) {
        if (
          formData.title &&
          formData.file &&
          formData.time &&
          formData.type &&
          formData.number
        ) {
          HTTP.post(`panel/course/episode/${formData.chapter}`, {
            title: formData.title,
            time: formData.time,
            type: formData.type,
            number: formData.number,
            file: formData.file,
          }).then((response) => {
            console.log(response);
            if (response.data.status) {
              Swal.fire({
                text: "افزودن اپیزود با موفقیت انجام شد",
                icon: "success",
              }).then(() => router.push(router.back()));
            } else {
              Swal.fire({
                text: "افزودن ویدئو انجام نشد لطفا مجددا تلاش کنید",
                icon: "warning",
              });
            }
          });
        } else {
          Swal.fire({
            text: "لطفا تمامی موارد خواسته شده رو وارد کنید",
            icon: "warning",
          });
        }
      } else {
        Swal.fire({
          text: "لطفا ابتدا یک فصل را انتخاب کنید",
          icon: "warning",
        });
      }
      loading.value = false;
    }
    return {
      saveEpisode,
      loading,
      formData,
      id,
      chapters,
    };
  },
};
</script>

<style></style>
