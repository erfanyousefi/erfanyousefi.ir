<template>
  <div class="comments">
    <div class="row">
      <div class="comment" v-for:="(comment, key) in comments" :key="key">
        <div class="comment-header">
          <img
            v-if="comment.user.avatar"
            :src="dotenv.baseURL + comment.user.avatar"
            alt=""
          />
          <img v-else src="@/assets/dist/img/profile.jpg" alt="" />
          <div>
            <span class="comment-username">{{ comment.user.name }}</span>
            <span class="comment-dateTime">{{
              new Date(comment.createdAt).toLocaleString("fa")
            }}</span>
          </div>
        </div>
        <div class="comment-body">
          <p class="comment-text">
            {{ comment.text }}
          </p>
          <button class="answer-comments-btn" @click="replayComment(comment._id)">
            پاسخ
          </button>
        </div>
        <div v-if="comment.children">
          <Comment v-if="comment.children.length > 0" :comments="comment.children" />
        </div>
        <div class="comment-border"></div>
      </div>
    </div>
  </div>
</template>

<script>
import dotenv from "@/dotenv.js";
import Comment from "@/components/partials/client/Comment.vue";
import Swal from "sweetalert2";
import {HTTP} from "@/controller/http.js";
import { ref } from '@vue/reactivity';
export default {
  props: {
    comments: Array,
  },
  components: {
    Comment,
  },
  setup() {
    let loading = ref(false)
    let Toast = Swal.mixin({
      toast: true,
      timer: 5000,
      timerProgressBar: true,
      position: "bottom-right",
    });
    function replayComment(id) {
      console.log(id);
      Swal.fire({
        title: "پاسخ خود را در کادر زیر وارد فرمائید",
        input: "textarea",
        inputPlaceholder: "نظر شما ....",
        cancelButtonText: "انصراف",
        showCancelButton: true,
        confirmButtonText: "ثبت پاسخ",
        inputValidator: (value) => {
          if (value.length < 5) {
            return "متن پاسخ نمیتواند کمتر از 5 کاراکتر باشد";
          }
        },
      }).then((response) => {
        if(response.isConfirmed){
          if (response.value) {
            HTTP.post(`/comment`, {
              text: response.value,
              parent: id,
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
          } else {
            Toast.fire({
              text: "متن پاسخ نمیتواند کمتر از 5 کاراکتر باشد",
            });
          }
        }
      });
    }
    return {
      dotenv,
      replayComment,
    };
  },
};
</script>

<style></style>
