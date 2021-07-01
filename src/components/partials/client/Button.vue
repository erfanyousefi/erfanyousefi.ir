<template>
  <button
    :disabled="setting.disabled"
    :class="'btn ' + setting.class">
    <SmallLoading :loading="setting.loading" />
    <span class="">{{ setting.title }} </span>
  </button>
</template>

<script>
import SmallLoading from "@/components/partials/SmallLoading.vue";
export default {
  props: {
    setting: Object,
  },
  components: {
    SmallLoading,
  },
};
</script>

<style>
:disabled {
  opacity: 0.7;
}
button{
    display: flex;
    justify-content: space-around;
    align-items: center; 
}
</style>