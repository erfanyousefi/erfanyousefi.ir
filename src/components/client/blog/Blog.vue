<template>
  <router-link to="" class="card card-blog blogCard">
        <img src="@/assets/dist/img/js.png" alt="" srcset="" />
        <div class="card-body">
          <div class="blogDetails">
            <strong class="text-right">{{blog.author}}</strong>
          <strong class="dateTime text-left">{{blog.createdAt}}</strong>
          </div>
          <div class="card-title">{{blog.title}}</div>
          <div class="card-text">
           {{blog.text}}
            <div class="tags">
              <span v-for:="tag in blog.tags">{{' #'+tag}}</span>
            </div>
          </div>
        </div>
      </router-link>
</template>
<script>
export default {
  props: {
    blog: Object,
  },
  setup() {

  },
};
</script>

<style>
.card-blog{
  box-shadow: 5px 5px 10px #888;
}
.blogDetails{
  display: flex;
  justify-content: space-between;
}
</style>