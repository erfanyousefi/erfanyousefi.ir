<template>
  <router-link :to="{name : 'blogPage', params :{slug : blog.slug}}" class="card card-blog blogCard">
        <img :src="'http://localhost:3000'+blog.img" alt="" srcset="" />
        <div class="card-body">
          <div class="blogDetails">
            <strong class="text-right">{{blog.author.name || blog.author.username}}</strong>
          <strong class="dateTime text-left">{{(new Date(blog.createdAt)).toLocaleDateString("fa")}}</strong>
          </div>
          <div class="card-title">{{blog.title}}</div>
          <div class="card-text">
            <div class="card-text" v-html="blog.text.substr(0, 200)+' ...'"></div>
            <div class="tags">
              <span v-for:="tag in blog.tags">{{' #'+tag.title}}</span>
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