<template>
  <div class="col-12">
    <div class="course-details">
      <div class="courseInfo">
        <div class="priceBox">
          <div class="price" dir="rtl">
            <span>قیمت :</span>
            <span v-if="details.type==='cash'" class="amount">
              <span class="d-flex align-items-center" v-if="details.discount > 0">
              <small class="discountPrice mx-1">{{ details.price}}</small>
              <span class="mx-1">{{computDiscount(details.price, details.discount) }}</span>
              <span>تومان</span>
            </span>
            <span v-else>
              {{ details.price}}
              <span>تومان</span>
            </span>
            </span>
            <span v-else-if="details.type==='free'" class="amount">رایگان</span>
          </div>
        </div>

        <div class="registerCourse">
          <button class="registerCourseBtn">ثبت نام در دوره</button>
        </div>
      </div>
      <div class="courseInfo my-4">
        <a href="" class="teacher">
          <div class="">{{ details.teacher.username }}</div>
          <span class="teacher-details">
            {{ details.teacher.username }}
          </span>
        </a>
      </div>
      <div class="courseInfo my-4">
        <div href="" class="students">
          <div class="">تعداد دانشجو ها : 355</div>
        </div>
      </div>
      <div class="courseInfo">
        <div class="chart">
          <strong>بازدید : 140</strong>
          <strong>نظرات : 140</strong>
        </div>
      </div>
      <div class="courseInfo my-4">
        <div class="userFeedBack">
          <a href="" class="like">
            <i class="fa fa-heart-o"></i>
            <i class="fa fa-heart"></i>
          </a>
          <a href="" class="pin">
            <i class="fa fa-bookmark-o"></i>
            <i class="fa fa-bookmark"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: Object,
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