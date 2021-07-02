<template>
  <div>
    <Multiselect
      v-model="value"
      :options="options"
      class="multiselect-blue"
    />
    <Multiselect
  v-model="value"
  mode="multiple"
  :options="[
    { value: 'batman', label: 'Batman' },
    { value: 'robin', label: 'Robin', disabled: true },
    { value: 'joker', label: 'Joker' },
  ]"
/>
<Multiselect
  v-model="value"
  mode="tags"
  :searchable="true"
  :createTag="true"
  :options="[
    { value: 'batman', label: 'Batman' },
    { value: 'robin', label: 'Robin' },
    { value: 'joker', label: 'Joker' },
  ]"
/>
  </div>
</template>

<script>
  import Multiselect from '@vueform/multiselect'

  export default {
    components: {
      Multiselect,
    },
    data() {
      return {
        value: null,
        options: [
          'Batman',
          'Robin',
          'Joker',
          'Batman1',
          'Robin1',
          'Joker1',
          'Batman2',
          'Robin2',
          'Joker2',
          'Batman3',
          'Robin3',
          'Joker3',
          'Batman4',
          'Robin4',
          'Joker4',
        ]
      }
    }
  }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>