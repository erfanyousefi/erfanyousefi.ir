<template>
  <div>
    <div class="sessions">
      <ul v-if="blog.chapters.length > 0">
        <li v-for:="(chapter, index) in blog.chapters">
          <a data-bs-toggle="collapse" :href="'#collapseUl'+index" role="button" aria-expanded="false">
            {{chapter.title}}
            <i class="fa fa-chevron-down collapseIcon"></i>
          </a>
          <ul class="collapse" :id="'collapseUl'+index">
            <li v-for:="(lesson, lessonIndex) in chapter.lessons">
                <router-link :to="{name : 'lessonPage', params : {slug : lesson.slug}}" exact-active-class="active">{{lesson.title}}</router-link>
            </li>
          </ul>
        </li>
      </ul>
      <strong v-else>
        در این مقاله فعلا فصل بندی و بخشی موجود نیست
      </strong>
    </div>
  </div>
</template>

<script>
export default {
    props : {
        blog : Object
    }
};
</script>

<style>
</style>