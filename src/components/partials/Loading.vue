<template>
  <div v-if="loading" class="row loading">
    <div class="spinner-border" role="status">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },
};
</script>

<style>
.loading {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>