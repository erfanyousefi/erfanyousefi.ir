<template>
  <div class="accordion" id="accordionExample">
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
        <div class="card-body p-0" v-if="chapter.lessons">
          <ul class="list-group p-0">
            <li
              class="list-group-item episode dropdown-item d-flex align-items-center"
              v-for:="(lesson, key) in chapter.lessons"
              :key="key"
            >
              <div class="d-flex align-items-center">
                <div class="dropdown-list-image mx-3">
                  <div class="episodeNumber">{{ key+1 }}</div>
                </div>
                <div class="font-weight-bold">
                  <div class="text-truncate">{{ lesson.title }}</div>
                  <div class="small text-gray-500">{{ lesson.time }}</div>
                </div>
                <div class="alert alert-success mx-3 p-1">

                </div>
              </div>
              <router-link
                :to="{ name: 'editLesson', params: { id: lesson._id } }"
                class="btn btn-sm btn-dark btn-icon-split mx-1"
              >
                <span class="icon text-white">
                  <i class="fas fa-pen"></i>
                </span>
                <span class="text">ویرایش جلسه</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import {HTTP} from "@/controller/http.js"
import {useStore} from "vuex";
export default {
  props: {
    chapters: Array,
  },
  setup(){
      let store = useStore();
      function formEditChapter(chapter){
          Swal.fire({
              title : "ویرایش عنوان فصل",
              input : "text", 
              inputValue : chapter.title,
              confirmButtonText : "به روز رسانی",
              showCancelButton : true,
            cancelButtonText : "انصراف"
          }).then(response => {
              if(response.isConfirmed){
                  HTTP.put(`panel/blog/chapter/${chapter._id}`,{
                      title : response.value
                  }).then(result => {
                      if(result.data.status){
                          store.commit("setBlogChapterUpdate", true)
                      }
                  })
              }
          })
      }

      return {
          formEditChapter
      }
  }
};
</script>

<style>
    .chapterTitle, .episode{
        display: flex;
        justify-content: space-between;
    }
</style>
