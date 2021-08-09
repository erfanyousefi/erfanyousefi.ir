<template>
  <div>
    <CardBody>
      <template v-slot:title> فرم ویرایش رمز عبور </template>
      <template v-slot:card>
        <div class="row text-center">
          <div class="col-md-4">
            <label>رمز عبور فعلی *</label>
            <input
              type="password"
              class="form-control my-2"
              placeholder="رمز فعلی را وارد کنید"
              v-model="formData.password"
            />
          </div>
          <div class="col-md-4">
            <label>رمز عبور جدید *</label>
            <input
              type="password"
              class="form-control my-2"
              placeholder="رمز عبور جدید"
              v-model="formData.newPassword"
            />
          </div>
          <div class="col-md-4">
            <label>تکرار رمز عبور جدید</label>
            <input
              type="password"
              class="form-control my-2"
              placeholder=" تکرار رمز عبور جدید"
              v-model="formData.confirmNewPassword"
            />
          </div>

          <div class="text-center">
            <Button
              @click="updatePassword"
              :setting="{
                loading,
                disabled: loading,
                class: 'btn-dark',
                title: 'ویرایش رمز عبور',
              }"
            />
          </div>
        </div>
      </template>
    </CardBody>
  </div>
</template>

<script>
import Button from "@/components/partials/client/Button.vue";
import { reactive, ref } from "@vue/reactivity";
import { HTTP } from "@/controller/http.js";
import CardBody from "@/components/partials/cms/CardBody.vue";
import Swal from "sweetalert2";
export default {
  components: { Button, CardBody },
  setup() {
    let formData = reactive({
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    let loading = ref(false);
    function updatePassword() {
      loading.value = true;
      if (formData.newPassword.length < 6 || formData.newPassword.length > 16) {
        Swal.fire({
          text: "رمز عبور جدید و تکرار آن نمیتواند کمتر از 6 و بیشتر از 16 کاراکتر باشد",
          icon: "warning",
          confirmButtonText: "بستن",
        });
      } else {
        if (formData.newPassword === formData.confirmNewPassword) {
          HTTP.patch(`panel/user/edit-password`, {
            password: formData.password,
            newPassword: formData.newPassword,
            confirmNewPassword: formData.confirmNewPassword,
          }).then((response) => {
            if (response.data.status) {
              formData.newPassword = formData.confirmNewPassword = formData.password = "";
              Swal.fire({
                text: response.data.message,
                icon: "success",
                confirmButtonText: "بستن",
              });
            } else {
              Swal.fire({
                text: response.data.message,
                icon: "warning",
                confirmButtonText: "بستن",
              });
            }
            loading.value = false;
          });
        } else {
          Swal.fire({
            text:
              "رمز عبور  جدید و تکرار آن باید برابر باشد لطفا در وارد کردن رمز عبور دقت کنید",
            icon: "warning",
            confirmButtonText: "بستن",
          });
        }
      }
    }
    return {
      updatePassword,
      formData,
      loading,
    };
  },
};
</script>

<style></style>
