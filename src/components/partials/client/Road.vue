<template>
  <div class="row my-5">
    <router-link to="/blogs" class="baner col-4">
      <div class="cover">
        <i class="fa fa-link"></i>
        یکم مقاله بخونیم
      </div>
      <img src="@/assets/dist/img/blog.svg" alt="" />
    </router-link>
    <router-link to="/courses" class="baner col-4">
      <div class="cover">
        <i class="fa fa-link"></i>
        چند تا فیلم ببینیم
      </div>

      <img src="@/assets/dist/img/video.svg" alt="" />
    </router-link>
    <router-link to="/podcasts" class="baner col-4">
      <div class="cover">
        <i class="fa fa-link"></i>
        چند تا پادکست گوش بدیم
      </div>
      <img src="@/assets/dist/img/podcast.svg" alt="" />
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
.baner:hover .cover {
  transform: scale(1);
  opacity: 1;
  transition: transform 0.5s ease-in-out;
}
</style>
