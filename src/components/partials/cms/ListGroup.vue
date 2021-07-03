<template>
  <ul class="list-group" v-if="episodes">
    <li class="list-group-item active" aria-current="true">اپیزود ها</li>
    <li class="list-group-item" v-for:="(episode, key) in episodes" :key="key">
      <div class="dropdown-list-image mr-3">
        <span>{{ episode.number }}</span>
      </div>
      <div class="font-weight-bold">
        <div class="text-truncate">{{ episode.title }}</div>
        <div class="small text-gray-500">{{ episode.time }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup(props) {
    let episodes = ref(props.episodes)
    console.log(episodes);
    return {
      episodes,
    };
  },
};
</script>

<style></style>
