<template>
  <div class="card">
    <span class="priceInfo type">
      {{
        course.type === "free"
          ? "رایـگانـ"
          : course.type === "cash"
          ? "نقـدیـ"
          : ""
      }}
    </span>
    <img :src="'http://localhost:3000'+course.img" alt="" srcset="" />
    <div class="card-body">
      <router-link to="" class="card-title p-2">{{ course.title }}</router-link>
      <div class="card-text p-2 mt-2 mb-3 text-sm opacity-70">
        {{ course.text }}
      </div>
      <router-link to="" class="footerCard">
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
          <div v-else>{{ course.price }} تومان</div>
        </span>
        <div v-else-if="course.type === 'free'" class="price">
          <div><strong class="text-success"> رایگان </strong></div>
          <div>
            <button class="btn bg-blue">مشاهده دوره</button>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: Object,
  },
  setup() {
    const computDiscount = (price, discount) => {
      return price - ((price * discount) / 100);
    };
    return {
      computDiscount,
    };
  },
};
</script>

<style>
</style>