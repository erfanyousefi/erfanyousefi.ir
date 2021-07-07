<template>
  <div class="container-fluid">
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <slot name="title"></slot>
      </div>
      <div class="card-body">
          <slot name="card"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style >
.courseTable {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
