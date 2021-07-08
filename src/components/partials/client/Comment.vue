
<template>
  <div class="comments">
    <div class="row">
      <div class="comment" v-for:="(comment, key) in comments" :key="key">
        <div class="comment-header">
          <img v-if="comment.user.avatar" :src="dotenv.baseURL+comment.user.avatar" alt="">
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
          <button class="answer-comments-btn">پاسخ</button>
        </div>
        <div v-if="comment.children">
          <Comment  v-if="comment.children.length > 0" :comments="comment.children" />
        </div>
        <div class="comment-border"></div>
      </div>
    </div>
  </div>
</template>

<script>
import dotenv from "@/dotenv.js"
import Comment from "@/components/partials/client/Comment.vue";
export default {
  props: {
    comments: Array,
  },
  components: {
    Comment,
  },
  setup() {
    return {
      dotenv
    }
  }
};
</script>

<style></style>
