<template>
  <div>
    <div class="row">
      <div class="col-md-6 my-3">
        <input
          type="text"
          placeholder="عنوان مقاله"
          class="form-control"
          v-model="formData.title"
        />
      </div>
      <div class="col-md-6 my-3" dir="ltr">
        <div class="input-group mb-3" dir="ltr">
          <input type="file" class="form-control" @change="fileAttach" />
          <label class="input-group-text" for="inputGroupFile02">تصویر</label>
        </div>
      </div>
      <div class="col-md-6 my-3">
        <div v-if="formData.tags">
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
      <div class="col-12 my-2">
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
          :setting="{
            title: 'افزودن مقاله',
            loading,
            disabled: loading,
            class: 'btn-dark',
          }"
          @click.prevent="saveBlog"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/partials/client/Button.vue";
import { reactive, ref } from "@vue/reactivity";
import { HTTP } from "@/controller/http.js";
import Editor from "@tinymce/tinymce-vue";
import Multiselect from "@vueform/multiselect";
import { onBeforeMount, watch } from "@vue/runtime-core";
import Swal from "sweetalert2";
export default {
  components: {
    Multiselect,
    Button,
    editor: Editor,
  },
  setup() {
    let tags = ref(null);
    let categories = ref(null);
    let loading = ref(false);
    let formData = reactive({
      tags: [],
      category: "",
      img: null,
      title: "",
      text: "",
    });
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
    watch(formData, (value) => {
      formData.title = value.title;
      formData.text = value.text;
      formData.tags = value.tags;
      formData.category = value.category;
      formData.img = value.img;
    });
    function saveBlog() {
      let data = new FormData();
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      data.append("title", formData.title);
      data.append("text", formData.text);
      data.append("tags", formData.tags);
      data.append("category", formData.category);
      data.append("img", formData.img);
      loading.value = true;
      let errorMessage = "";
      if (
        formData.title &&
        formData.text &&
        formData.category &&
        formData.tags.length &&
        formData.img
      ) {
        HTTP.post("panel/blog/insert", data, config).then((response) => {
          console.log(response);
          if (response.data.status) {
            Swal.fire({
              text: "افزودن مقاله باموفقیت انجام شد",
              icon: "success",
            });
          } else {
            if (response.data.msg) {
              Object.keys(response.data.msg).forEach((key) => {
                errorMessage += response.data.msg[key] + "<br/>";
              });
              Swal.fire({
                html: `<span class="invalid-feedback">${errorMessage}</span>`,
                icon: "warning",
              }).then(() => {
                errorMessage = "";
              });
            } else {
              Swal.fire({
                text: "افزودن مقاله انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید",
                icon: "warning",
              });
            }
          }
          loading.value = false;
        });
      } else {
        Swal.fire({
          text: "لطفا تمامی موارد خواسته شده را پر کنید",
          icon: "info",
        });
        loading.value = false;
      }
    }
    return {
      tags,
      categories,
      formData,
      fileAttach,
      saveBlog,
      loading,
    };
  },
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style>
.invalid-feedback {
  display: block !important;
  text-align: center;
}
</style>
