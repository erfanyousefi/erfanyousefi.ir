<template>
  <div>

    <div v-if="chapters.length > 0" class="chapter" v-for:="(chapter, index) in chapters">
      <div class="header-chapter">
        <h3>{{ chapter.title }}</h3>
        <a
          class="downList"
          data-bs-toggle="collapse"
          :href="'#collapseChapter' + index"
          role="button"
          aria-expanded="false"
        >
          <i class="fa fa-chevron-down collapseIcon"></i>
        </a>
      </div>
      <div
        :id="'collapseChapter' + index"
        class="row collapse justify-content-center my-2"
      >
        <div
          class="col-12 episode"
          v-for:="(episode, epIndex) in chapter.index"
        >
          <div class="info-episod">
            <span class="number-episode">{{ episode.number }}</span>
            <h5 class="title-episod">{{ episode.title }}</h5>
            <div class="type-time-episode">
              <span class="time-episod">{{ episode.time }}</span>
              <strong class="type-episod">{{ episode.type }}</strong>
            </div>
          </div>
          <div class="controls-episod">
            <a href="" class="download-episode">
              <i class="fa fa-download"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="col-12 chapter text-center">
      <strong>به زودی این دوره منتشر خواهد شد منتظر ما باشید</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chapters: Array,
  },
};
</script>

<style>
</style>