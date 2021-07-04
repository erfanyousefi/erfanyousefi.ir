<template>
  <div class="accordion" id="accordionExample" v-if="chapters">
    <div class="card" v-for:="(chapter, key) in chapters" :key="key">
      <div class="card-header bg-dark chapterTitle" :id="'heading' + key">
        <h5 class="mb-0">
          <a
            class="btn text-white"
            type="button"
            data-toggle="collapse"
            :data-target="'#collapse' + key"
            aria-expanded="true"
            :aria-controls="'collapse' + key"
          >
            {{ chapter.title }}
          </a>
        </h5>
        <button
          type="button"
          @click.prevent="formEditChapter(chapter)"
          class="btn btn-sm btn-light btn-icon-split mx-1"
        >
          <span class="icon text-white">
            <i class="fas fa-pen"></i>
          </span>
          <span class="text">ویرایش عنوان فصل</span>
        </button>
      </div>
      <div
        :id="'collapse' + key"
        class="collapse show"
        :aria-labelledby="'heading' + key"
        data-parent="#accordionExample"
      >
        <div class="card-body p-0" v-if="chapter.episodes">
          <ul class="list-group p-0">
            <li
              class="list-group-item episode dropdown-item d-flex align-items-center"
              v-for:="(episode, key) in chapter.episodes"
              :key="key"
            >
              <div class="d-flex align-items-center">
                <div class="dropdown-list-image mx-3">
                  <div class="episodeNumber">{{ episode.number }}</div>
                </div>
                <div class="font-weight-bold">
                  <div class="text-truncate">{{ episode.title }}</div>
                  <div class="small text-gray-500">{{ episode.time }}</div>
                </div>
                <div class="alert alert-success mx-3 p-1">
                  {{
                    episode.type == "free"
                      ? "رایگان"
                      : episode.type == "cash"
                      ? "نقدی"
                      : گگ
                  }}
                </div>
              </div>
              <router-link
                :to="{ name: 'editEpisode', params : {id : episode._id} }"
                class="btn btn-sm btn-dark btn-icon-split mx-1"
              >
                <span class="icon text-white">
                  <i class="fas fa-pen"></i>
                </span>
                <span class="text">ویرایش اپیزود</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { HTTP } from "@/controller/http.js";
import { ref } from "@vue/reactivity";
import {useStore} from "vuex";
// import ListGroup from "@/components/partials/cms/ListGroup.vue";
export default {
  props: {
    chapters: Array,
  },
  watch: {
    chapters: {
      handler(value, oldValue) {
        console.log("The list of colors has changed!", value, oldValue);
      },
      deep: true,
    },
  },
  setup() {
    let store = useStore();
    let title = ref(null);
    function formEditChapter(chapter) {
      Swal.fire({
        title: "ویرایش عنوان فصل مورد نظر",
        input: "text",
        inputValue: ` ${chapter.title}`,
        inputValidator: (value) => {
          if (!value) {
            return "عنوان فصل نمیتواند خالی باشد";
          } else {
            title.value = value;
          }
        },
        confirmButtonText: "به روز رسانی",
      }).then((response) => {
        if (response.isConfirmed) {
          HTTP.put(`panel/course/chapter/${chapter._id}`, { title: title.value }).then(
            (result) => {
              if (result.data.status) {
                Swal.fire({
                  text: "به روز رسانی با موفقیت انجام شد",
                  icon: "success",
                }).then(() => {
                  store.commit("setChapterUpdate", true);
                });
              } else {
                Swal.fire({
                  text: "به روز رسانی انجام نشد",
                  icon: "error",
                });
              }
            }
          );
        }
      });
    }
    return {
      formEditChapter,
    };
  },
};
</script>

<style>
.episodeNumber {
  border: 1px solid #888;
  border-radius: 50%;
  padding: 7px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777;
  background-color: #fff;
}
.chapterTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.episode {
  justify-content: space-between;
}
</style>
