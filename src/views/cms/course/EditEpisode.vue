<template>
  <div>
    <Title title="افزودن " />
    <div>
      <div class="container-fluid">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <router-link
              :to="{ name: 'editCourse', params: { id: course } }"
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
                  :setting="{ title: 'به روز رسانی فصل', loading, class: 'btn-dark' }"
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
import { useStore } from "vuex";
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
    let episode = ref(null);
    let course = ref(null);
    let loading = ref(false);
    let store = useStore();
    let formData = reactive({
      title: "",
      number: "",
      type: "",
      file: "",
      time: "",
      chapter: "",
    });
    onBeforeMount(() => {
      if (!store.getters.isAdmin) {
        router.push({ name: "notFound" });
      }
      HTTP.get(`panel/course/episode/${id}`).then((response) => {
        console.log(response);
        if (response.data.status) {
          episode.value = response.data.episode;
          episode.value.chapter = response.data.chapter;
          course.value = response.data.course;
          HTTP.get(`panel/course/chapters/${response.data.course}`).then((response) => {
            if (response.data.status) {
              chapters.value = response.data.chapters;
            }
          });
        } else {
          Swal.fire({
            text: "اپیزود یافت نشد",
            icon: "warning",
          }).then(() => router.push(router.back()));
        }
      });
    });
    watch(episode, (value) => {
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
          HTTP.put(`panel/course/episode/${id}`, {
            title: formData.title,
            time: formData.time,
            type: formData.type,
            chapter: formData.chapter,
            number: formData.number,
            file: formData.file,
          }).then((response) => {
            console.log(response);
            if (response.data.status) {
              Swal.fire({
                text: "به روز رسانی اپیزود با موفقیت انجام شد",
                icon: "success",
              }).then(() => router.push(router.back()));
            } else {
              Swal.fire({
                text: "به روزرسانی اپیزود  انجام نشد لطفا مجددا تلاش کنید",
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
      course,
    };
  },
};
</script>

<style></style>
