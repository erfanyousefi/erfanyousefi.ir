<template>
  <div class="container-fluid">
    <div class="card shadow mb-4">
      <div class="card-header py-3">فرم ویرایش مشخصات کاربران</div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <label>نام *</label>
            <input
              type="text"
              class="form-control my-2"
              placeholder="نام و نام خانوادگی"
              v-model="formData.name"
            />
          </div>
          <div class="col-md-4">
            <label>شماره موبایل *</label>
            <input
              type="text"
              class="form-control my-2"
              placeholder="شماره تماس"
              v-model="formData.phone"
            />
          </div>
          <div class="col-md-4">
            <label>ایمیل</label>
            <span class="form-control my-2">{{ formData.email }}</span>
          </div>
          <div class="col-md-6">
            <label>آدرس</label>
            <input
              type="text"
              class="form-control my-2"
              placeholder="آدرس"
              v-model="formData.address"
            />
          </div>
          <div class="col-md-6">
            <label>عکس پروفایل</label>
            <input type="file" class="form-control my-2" @change="attachFile" />
          </div>
          <div class="col-md-12">
            <label>بیوگرافی</label>
            <textarea
              rows="4"
              class="form-control my-2"
              placeholder="بیوگرافی"
              v-model="formData.bio"
            ></textarea>
          </div>
          <Button
            @click="updateProfile"
            :setting="{
              loading,
              disabled: loading,
              class: 'btn-dark',
              title: 'به روز رسانی پروفایل',
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/partials/client/Button.vue";
import { reactive, ref } from "@vue/reactivity";
import { HTTP } from "@/controller/http.js";
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, watch } from "@vue/runtime-core";
import Swal from "sweetalert2";
import { useStore } from 'vuex';
export default {
  components: { Button },
  setup() {
    let formData = reactive({
      name: "",
      phone: "",
      email: "",
      address: "",
      bio: "",
      avatar: "",
    });
    let loading = ref(false);
    let user = ref(null);
    let route = useRoute();
    let store = useStore();
    let router = useRouter();
    function getUser() {
      HTTP.get(`panel/user/${route.params.id}`).then((response) => {
        if (response.data.user) {
          user.value = response.data.user;
        } else {
          Swal.fire({
            text: "کاربری یافت نشد",
            icon: "warning",
            confirmButtonText: "بستن",
          }).then(() => {
            router.push({ name: "usersList" });
          });
        }
      });
    }

    function attachFile(event) {
      formData.avatar = event.target.files[0];
    }
    onBeforeMount(() => {
      if (!store.getters.isAdmin) {
        router.push({ name: "notFound" });
      }
      getUser();
    });
    watch(user, (value) => {
      formData.name = value.name;
      formData.email = value.email;
      formData.phone = value.phone;
      formData.address = value.address;
      formData.bio = value.bio;
    });
    function updateProfile() {
      loading.value = true;
      let data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(`${[key]}`, formData[key]);
      });

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      HTTP.put(`panel/user/${route.params.id}`, data, config).then((response) => {
        loading.value = false;
        if (response.data.status) {
          getUser();
          Swal.fire({
            text: "به روز رسانی باموفقیت انجام شد",
            icon: "success",
            confirmButtonText: "بستن",
          });
        } else {
          Swal.fire({
            text: "به روز رسانی انجام نشد لطفا بعدا یا مجددا تلاش کنید",
            icon: "warning",
            confirmButtonText: "بستن",
          });
        }
      });
    }
    return {
      updateProfile,
      formData,
      loading,
      attachFile,
    };
  },
};
</script>

<style></style>
