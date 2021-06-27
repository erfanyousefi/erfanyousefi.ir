<template>
  <div v-if="loading" class="d-inline mx-2 loading">
    <div class="spinner-border spinner-border-sm" role="status">
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