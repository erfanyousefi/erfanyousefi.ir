<template>
  <section class="bg-white" id="bodyOfSite">
    <div class="row my-4">
      <div class="titleBar my-2">
        <h3>ارتباط با عرفان یوسفی</h3>
        <div class="borderTitle"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <p>
          دوست عزیز سلام من عرفان یوسفی هستم طراح و برنامه نویس این وبسایت اگه به هردلیلی
          دوست نداری توی وبسایت من ثبت نام کنی و عضو بشی و میخوای با من ارتباط برقرار کنی
          و یا میخوای مشاوره بگیری و در مورد موضوعی که فکرت رو مشغول کرده یا شمارو در سر دوراهی قرار داره و نمیدونی با چه تکنولوژی یا زبانی شروع کنی همین الان به من پیام بده و شما
          میتونی از طریق این فرم به طور رسمی پیغامت رو برام بزاری و در اولین فرصت بررسیش
          میکنم و از طریق راه های ارتباطی که وارد کردی پیغام شمارو جواب خواهم داد
        </p>
        <div class="contact-us">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 my-2">
              <input
                type="text"
                v-model="formData.name"
                class="form-control"
                placeholder="نام و نام خانوادگی"
              />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 my-2">
              <input
                type="text"
                v-model="formData.email"
                class="form-control"
                placeholder="شماره تلفن، ایمیل، ایدی یکی از شبکه های اجتماعی"
              />
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 my-2">
              <textarea
                v-model="formData.message"
                class="form-control my-3"
                rows="7"
                placeholder="پیغام شما"
              ></textarea>
              <div class="arcaptcha" data-site-key="qxyz7tze81"></div>
              <div>
                <Button
                  :setting="{
                    class: 'btn-primary my-2',
                    title: 'ارسال پیغام',
                    loading,
                    disabled: loading,
                  }"
                  @click="sendForm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import Button from "@/components/partials/client/Button.vue";
import { HTTP } from "@/controller/http.js";
import Swal from "sweetalert2";
export default {
  components: {
    Button,
  },
  setup() {
    let loading = ref(false);
    let formData = reactive({
      name: "",
      email: "",
      message: "",
    });
    function sendForm() {
      loading.value = true;
      HTTP.post(`/contact-us`, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }).then((response) => {
        loading.value = false;
        if (response.data.status) {
          Swal.fire({
            text: response.data.message,
            icon: "success",
            confirmButtonText: "بستن",
          });
          formData.name = "";
          formData.email = "";
          formData.message = "";
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
            confirmButtonText: "بستن",
          });
        }
      });
    }
    
    return {
      formData,
      loading,
      sendForm,
    };
  },
};
</script>

<style></style>
