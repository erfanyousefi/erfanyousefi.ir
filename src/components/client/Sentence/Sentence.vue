<template>
  <div class="textOfDay  col-sm-12 col-xs-12">
                    <img src="@/assets/dist/img/quote-right.png" alt="">
                    <span>
                        {{text}}
                    </span>
                    <img src="@/assets/dist/img/quote-left.png" alt="">
                </div>
</template>

<script>
export default {
    props : {
        text : String
    }
}
</script>

<style>

</style>