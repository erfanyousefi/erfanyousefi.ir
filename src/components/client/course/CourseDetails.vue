<template>
  <div class="col-12">
    <div class="course-details">
      <div class="courseInfo">
        <div class="priceBox">
          <div class="price" dir="rtl">
            <span>قیمت :</span>
            <span v-if="details.type === 'cash'" class="amount">
              <span class="d-flex align-items-center" v-if="details.discount > 0">
                <small class="discountPrice mx-1">{{ details.price }}</small>
                <span class="mx-1">{{
                  computDiscount(details.price, details.discount)
                }}</span>
                <span>تومان</span>
              </span>
              <span v-else>
                {{ details.price }}
                <span>تومان</span>
              </span>
            </span>
            <span v-else-if="details.type === 'free'" class="amount">رایگان</span>
          </div>
        </div>

        <div class="registerCourse">
          <div v-if="user">
            <Button
              v-if="user.courses.includes(details._id)"
              :setting="{
                loading,
                disabled: loading,
                class: 'registerCourseBtn bg-info',
                title: 'شما قبلا در این دوره ثبت نام کرده اید',
              }"
            ></Button>
            <Button
              v-else
              :setting="{
                loading,
                disabled: loading,
                class: 'registerCourseBtn',
                title: 'ثبت نام در دوره',
              }"
              @click="registerCourse(details.id)"
            />
          </div>
          <div v-else>
            <Button
              :setting="{
                loading,
                disabled: loading,
                class: 'registerCourseBtn',
                title: 'ثبت نام در دوره',
              }"
              @click="registerCourse(details.id)"
            />
          </div>
        </div>
      </div>
      <div class="courseInfo my-4" v-if="details.teacher">
        <a href="" class="teacher" v-if="details.teacher.name">
          <div class="">{{ details.teacher.name }}</div>
          <span class="teacher-details">
            {{ details.teacher.bio || '-' }}
          </span>
        </a>
      </div>
      <div class="courseInfo my-4">
        <div href="" class="students">
          <div class="">
            تعداد دانشجو ها : {{ details.students ? details.students.length : 0 }}
          </div>
        </div>
      </div>
      <div class="courseInfo">
        <h4>برچسب ها</h4>
        <div v-for:="(tag, key) in details.tags" class="tag">{{ tag.title }}</div>
      </div>
      <!-- <div class="courseInfo">
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
      </div> -->
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { useStore } from "vuex";
import { HTTP } from "@/controller/http.js";
import Button from "@/components/partials/client/Button.vue";
import { ref } from "@vue/reactivity";
import { onBeforeMount, watch } from "@vue/runtime-core";
export default {
  props: {
    details: Object,
  },
  components: {
    Button,
  },
  setup() {
    let store = useStore();
    let loading = ref(false);
    let user = ref(null);
    const computDiscount = (price, discount) => {
      return price - (price * discount) / 100;
    };
    let Toast = Swal.mixin({
      toast: true,
      position: "bottom-right",
      timerProgressBar: true,
      timer: 3000,
      showConfirmButton: false,
      background: "#fefefe",
    });
    onBeforeMount(() => {
      user.value = store.state.user;
    });
    function saveCourse(course) {
      let token = store.state.token;
      HTTP.post("/registerInCourse", {
        token,
        course,
      }).then((response) => {
        if (response.data.status) {
          Toast.fire({
            text: response.data.message,
            icon: "success",
          }).then(() => {
            store.commit("setCourseRegisterUpdate", true);
          });
          loading.value = false;
        } else {
          Toast.fire({
            text: response.data.message,
            icon: "error",
          });
          loading.value = false;
        }
      });
    }
    function registerCourse(id) {
      loading.value = true;
      if (store.getters.isLoggedIn) {
        saveCourse(id);
      } else {
        loading.value = false;
        Toast.fire({
          title: "شما هنوز وارد حساب کاربری خود نشده اید",
          icon: "info",
        });
      }
    }
    watch(() => {
      if (store.getters.getStateCourseRegister) {
        console.log("updated");
        let token = store.state.token;
        HTTP.post("/user", {
          token,
        }).then((response) => {
          if (response.data.user) {
            store.commit("setUser", response.data.user);
            user.value = response.data.user;
            store.commit("setUserListUpdate", false);
          }
        });
      }
    });
    return {
      registerCourse,
      computDiscount,
      loading,
      user,
    };
  },
};
</script>

<style></style>
