<template>
  <div class="row text-center">
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <div class="card card-signin my-5">
        <div class="card-body">
          {{ token }}
          <h5 class="card-title text-center">ایجاد حساب کاربری</h5>
          <div class="form-signin">
            <Input
              :rules="{
                id: 'name',
                placeholder: 'نام و نام خانوادگی',
                type: 'text',
                required: 'true',
                min: 3,
              }"
              @inputValue="getData"
            />
            <Input
              :rules="{
                id: 'email',
                placeholder: 'آدرس ایمیل',
                type: 'text',
                required: 'true',
              }"
              @inputValue="getData"
            />
            <Input
              :rules="{
                id: 'password',
                placeholder: 'رمز عبور',
                type: 'password',
                required: 'true',
                min: 6,
                max: 16,
              }"
              @inputValue="getData"
            />
            <Button
              :setting="{
                class: 'btn-dark',
                loading,
                title: 'ایجاد حساب کاربری',
                disabled,
              }"
              @click.prevent="sendData"
            />
            <hr class="my-4" />
            <button class="btn btn-lg btn-light btn-block text-uppercase">
              ورود
            </button>
            <br />
            <router-link to="" class="btn btn-lg text-primary">
              رمز خود را فراموش کرده ام
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/partials/client/Input.vue";
import Button from "@/components/partials/client/Button.vue";
import { reactive, ref, onBeforeMount } from "vue";
// import storage from "@/controller/LocalStorage.js";
import { HTTP } from "@/controller/http.js";
import Alert from "@/controller/alertSystem.js";
import Swal from "sweetalert2";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    Input,
    Button,
  },

  setup() {
    let store = useStore();
    let router = useRouter();
    onBeforeMount(() => {
      // let token = storage.get("user-token");
      let isLoggedIn = store.getters.isLoggedIn
      if (isLoggedIn) {
        router.push({ name: "homePage" });
      }
    });
    let formData = reactive({
      name: "",
      email: "",
      password: "",
    });
    let loading = ref(false);
    let disabled = ref(true);
    function sendData() {
      loading.value = true;
      disabled.value = true;
      if (formData.name && formData.email && formData.password) {
        loading.value = true;
        HTTP.post("auth/register", { ...formData }).then((response) => {
          let text = "";
          if (!response.data.status) {
            if (response.data.msg) {
              Object.keys(response.data.msg).forEach((key) => {
                text += response.data.msg[key] + "<br/>";
              });
              loading.value = false;
              Alert.errorAlert({ text });
            } else {
              text = response.data.message;
            }
            loading.value = false;
            Alert.errorAlert({ text });
          }
          if (response.data.status) {
            store.commit("setToken", response.data.token);
            store.commit("setUser", response.data.user);
            loading.value = false;
            text = response.data.message;
            Swal.fire({
              text: text,
              icon: "success",
              confirmButtonText: "باشه",
            }).then((response) => {
              console.log(response);
              router.push({ name: "homePage" });
            });
          }
        });
      }
    }
    function getData(value) {
      Object.keys(value).forEach((key) => {
        formData[key] = value[key];
      });
      if (formData.name && formData.email && formData.password) {
        disabled.value = false;
      }
    }

    return {
      sendData,
      formData,
      loading,
      getData,
      disabled,
    };
  },
};
</script>

<style scoped>
* {
  font-family: iranSans;
}
.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 5px 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}
.btn {
  cursor: pointer;
}
button[disabled] {
  cursor: not-allowed;
}
.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
  text-align: center;
}

.form-signin {
  width: 100%;
  text-align: center;
}

.form-signin .btn {
  font-size: 13px;
  border-radius: 10px;
  font-weight: bold;
  padding: 10px;
  transition: all 0.2s;
}
</style>
