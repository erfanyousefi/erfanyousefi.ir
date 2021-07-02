<template>
  <div></div>
</template>

<script>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import { onBeforeMount } from '@vue/runtime-core';
export default {
  setup(){
    let store = useStore();
    let router = useRouter();
    onBeforeMount(() => {
      store.commit("removeToken");
      store.commit("removeUser");
      router.push({ name: "loginPage" });
    })
    return {

    }
  }
}
</script>

<style></style>
