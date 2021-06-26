<template>
  <router-link :to="{name : 'coursePage', params : {slug : course.slug}}" class="card">
    <span class="priceInfo type">
      {{
        course.type === "free"
          ? "رایـگانـ"
          : course.type === "cash"
          ? "نقـدیـ"
          : ""
      }}
    </span>
    <img :src="'http://localhost:3000' + course.img" alt="" />
    <div class="card-body">
      <h6 class="card-title p-2">{{ course.title }}</h6>
      <div class="card-text p-2 mt-2 mb-3 text-sm opacity-70">
        {{ course.text.substr(1, 200) + "..." }}
      </div>
      <div class="footerCard">
        <span v-if="course.type === 'cash'" class="cash">
          <div class="price" v-if="course.discount > 0">
            <div>
              <button class="discountPrice">{{ course.price }} تومان</button>
              <button class="btn discount">تخفیف {{ course.discount }}%</button>
            </div>
            <div class="d-flex">
              {{ computDiscount(course.price, course.discount) }} تومان
              <div class="arrowBtn mx-2">
                <i class="fa fa-arrow-left"></i>
              </div>
            </div>
          </div>
          <div v-else class="price">
           <strong> {{ course.price }} تومان</strong>
            <div>
              <button class="btn bg-blue">مشاهده دوره</button>
            </div>
          </div>
        </span>
        <div v-else-if="course.type === 'free'" class="price">
          <div><strong class="text-success"> رایگان </strong></div>
          <div>
            <button class="btn bg-blue">مشاهده دوره</button>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    course: Object,
  },
  setup() {
    const computDiscount = (price, discount) => {
      return price - (price * discount) / 100;
    };
    return {
      computDiscount,
    };
  },
};
</script>

<style>
</style>