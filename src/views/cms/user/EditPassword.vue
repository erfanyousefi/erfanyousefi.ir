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
// import { HTTP } from "@/controller/http.js";
// import Swal from "sweetalert2";
import CardBody from "@/components/partials/cms/CardBody.vue";
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
      let data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(`${[key]}`, formData[key]);
      });
  console.log(formData);
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
