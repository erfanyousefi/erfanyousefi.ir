<template>
  <div>
    <Title title="ثبت نظرات" />
    <textarea
      class="form-control"
      placeholder="نظر شما..."
      rows="5"
      v-model="commentText"
    ></textarea>
    <Button
      :setting="{
        title: 'ثبت نظر',
        class: 'btn-dark my-2',
        loading,
        disabled: loading,
      }"
      @click="sendComment(target)"
    />
  </div>
</template>

<script>
import { useStore } from "vuex";
import Swal from "sweetalert2";
import { HTTP } from "@/controller/http.js";
import Title from "@/components/partials/cms/Title.vue";
import Button from "@/components/partials/client/Button.vue";
import { ref } from "@vue/reactivity";
export default {
  components: {
    Title,
    Button,
  },
  props : {
    target : Object
  },
  setup() {
    let store = useStore();
    let commentText = ref(null);
    let loading = ref(false);
    let Toast = Swal.mixin({
      timerProgressBar: true,
      timer: 5000,
      toast: true,
      position: "bottom-right",
      showConfirmButton: false,
    });
    function sendComment(target) {
      loading.value = true;
      if (store.getters.isLoggedIn) {
        if (!commentText.value || commentText.value.length < 5) {
          Toast.fire({
            text: "متن نظر نمیتواند خالی یا کمتر از 5 کاراکتر باشد",
            icon: "error",
          });
          loading.value = false;
        } else {
          if (target.blog) {
            HTTP.post(`/comment`, {
              text: commentText.value,
              blog: target.blog,
            }).then((comment) => {
              loading.value = false;
              if (comment.data.status) {
                Toast.fire({
                  text: comment.data.message,
                  icon: "success",
                });
              } else {
                Toast.fire({
                  text: comment.data.message,
                  icon: "error",
                });
              }
            });
          } else if (target.course) {
            HTTP.post(`/comment`, {
              text: commentText.value,
              course: target.course,
            }).then((comment) => {
              loading.value = false;
              if (comment.data.status) {
                Toast.fire({
                  text: comment.data.message,
                  icon: "success",
                });
              } else {
                Toast.fire({
                  text: comment.data.message,
                  icon: "error",
                });
              }
            });
          }
        }
      } else {
        Toast.fire({
          text: "شما برای ثبت نظر ابتدا باید وارد حساب کاربری خود شوید",
          icon: "warning",
        });
        loading.value = false;
      }
    }
    return {
      sendComment,
      loading,
      commentText
    };
  },
};
</script>

<style></style>
