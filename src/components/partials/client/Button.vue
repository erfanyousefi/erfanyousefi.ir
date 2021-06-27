<template>
  <button
    :disabled="setting.disabled"
    :class="'btn btn-lg btn-block ' + setting.class">
    <SmallLoading :loading="setting.loading" />
    <span class="d-inline">{{ setting.title }} </span>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>