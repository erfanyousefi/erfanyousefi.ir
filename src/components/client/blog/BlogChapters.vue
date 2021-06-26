<template>
  <div>
    <div class="sessions">
      <ul>
        <li v-for:="(chapter, index) in blog.chapters">
          <a data-bs-toggle="collapse" href="#collapseUl1" role="button" aria-expanded="false">
            {{chapter.title}}
            <i class="fa fa-chevron-down collapseIcon"></i>
          </a>
          <ul class="collapse" id="collapseUl1">
            <li v-for:="(session, sessionIndex) in chapter.sessions">
                <router-link :to="{name : 'blogPage', params : {slug : session.slug}}" class="active">{{session.title}}</router-link>
            </li>
          </ul>
        </li>
      </ul>
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