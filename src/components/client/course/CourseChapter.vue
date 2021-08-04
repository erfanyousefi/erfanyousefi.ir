<template>
  <div class="row my-3">
    <div
      v-if="chapters.length > 0"
      class="chapter my-2"
      v-for:="(chapter, index) in chapters"
    >
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
        <div class="col-12 episode" v-for:="(episode, epIndex) in chapter.episodes">
          <div class="info-episod">
            <span class="number-episode">{{ episode.number }}</span>
            <h5 class="title-episod">{{ episode.title }}</h5>
            <div class="type-time-episode">
              <span class="time-episod">{{ episode.time }}</span>
              <strong class="type-episod">{{
                episode.type === "free"
                  ? "رایـگانــ"
                  : episode.type === "cash"
                  ? "نقدی"
                  : ""
              }}</strong>
            </div>
          </div>
          <div v-if="isLoggedIn">
            <div class="controls-episod" v-if="user.courses.includes(courseID)">
              <a :href="episode.file" class="download-episode">
                <i class="fa fa-download"></i>
              </a>
            </div>
            <div class="controls-episod" v-else>
              <a
                v-if="episode.type === 'free'"
                :href="episode.file"
                class="download-episode"
              >
                <i class="fa fa-download"></i>
              </a>
              <a
                v-else
                @click="accessToEpisode"
                class="download-episode bg-danger text-white"
              >
                <i class="fa fa-lock"></i>
              </a>
            </div>
          </div>
          <div v-else>
            <div class="controls-episod">
              <a
                v-if="episode.type === 'free'"
                :href="episode.file"
                class="download-episode"
              >
                <i class="fa fa-download"></i>
              </a>
              <a
                v-else
                @click="accessToEpisode"
                class="download-episode bg-danger text-white"
              >
                <i class="fa fa-lock"></i>
              </a>
            </div>
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
import Swal from "sweetalert2";
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: {
    chapters: Array,
    courseID: String,
  },
  setup() {
    const store = useStore();
    let user = ref(null);
    let isLoggedIn = store.getters.isLoggedIn;
    onBeforeMount(() => {
      user.value = store.state.user;
    });
    const Toast = Swal.mixin({
      toast: true,
      timerProgressBar: true,
      timer: 5000,
      position: "bottom-right",
      showConfirmButton: false,
    });
    function accessToEpisode() {
      Toast.fire({
        text: "برای دانلود این ویدئو باید در دوره ثبت نام کنید",
        icon: "warning",
      });
    }

    return {
      accessToEpisode,
      user,
      isLoggedIn,
    };
  },
};
</script>

<style></style>
