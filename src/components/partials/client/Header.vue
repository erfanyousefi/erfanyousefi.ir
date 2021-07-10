<template>
  <div>
    <div id="upMenu"></div>
    <div id="logo">
      <img src="@/assets/dist/img/logo.gif" alt="" />
    </div>
    <header class="bg-white">
      <nav id="nav" class="nav">
        <a href="" class="openMenuBtn">منو</a>
        <div class="hamburger hamburger--demo-6 js-hover">
          <div class="hamburger__line hamburger__line--01">
            <div
              class="hamburger__line-in hamburger__line-in--01 hamburger__line-in--demo-5"
            ></div>
          </div>
          <div class="hamburger__line hamburger__line--02">
            <div
              class="hamburger__line-in hamburger__line-in--02 hamburger__line-in--demo-5"
            ></div>
          </div>
          <div class="hamburger__line hamburger__line--03">
            <div
              class="hamburger__line-in hamburger__line-in--03 hamburger__line-in--demo-5"
            ></div>
          </div>
          <div class="hamburger__line hamburger__line--cross01">
            <div
              class="hamburger__line-in hamburger__line-in--cross01 hamburger__line-in--demo-5"
            ></div>
          </div>
          <div class="hamburger__line hamburger__line--cross02">
            <div
              class="hamburger__line-in hamburger__line-in--cross02 hamburger__line-in--demo-5"
            ></div>
          </div>
          <div class="global-menu">
            <div class="global-menu__wrap">
              <router-link class="global-menu__item global-menu__item--demo-3" to="/">خانه</router-link>
              <router-link :to="{ name: 'blogs' }" class="global-menu__item global-menu__item--demo-3">مقالات</router-link>
              <router-link :to="{ name: 'courses'}" class="global-menu__item global-menu__item--demo-3">دوره ها</router-link>
              <router-link :to="{ name: 'podcasts'}" class="global-menu__item global-menu__item--demo-3">پادکست ها</router-link>
              <router-link v-if="!isLoggedIn" :to="{ name: 'loginPage' }" class="global-menu__item global-menu__item--demo-3">ورود</router-link>
              <router-link v-if="!isLoggedIn" :to="{ name: 'signupPage' }" class="global-menu__item global-menu__item--demo-3">ثبت نام</router-link>
              <router-link :to="{ name: 'contactus' }" class="global-menu__item global-menu__item--demo-3">تماس با ما</router-link>
              <router-link  v-if="isLoggedIn" :to="{ path: 'dashboard' }" class="global-menu__item global-menu__item--demo-3">پنل کاربری</router-link>
              <router-link v-if="isLoggedIn" to="/logout" class="global-menu__item global-menu__item--demo-3">خروج</router-link>
            </div>
          </div>
          <svg class="shape-overlays" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path class="shape-overlays__path"></path>
            <path class="shape-overlays__path"></path>
            <path class="shape-overlays__path"></path>
          </svg>
        </div>
        <div class="titleUp">وبسایت آموزشی عرفان یوسفی</div>
        <ul>
          <li>
            <router-link to="/" class="link">کافه</router-link>
          </li>
          <li><router-link :to="{ name: 'blogs' }">بلاگ ها</router-link></li>
          <li><router-link :to="{ name: 'courses' }">دوره ها</router-link></li>

          <li>
            <router-link :to="{ name: 'contactus' }">تماس با من</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link :to="{ name: 'signupPage' }">ثبت نام</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link :to="{ name: 'loginPage' }">ورود</router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/dashboard">حساب کاربری</router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/logout">خروج</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    let store = useStore();
    let isLoggedIn = computed(() => store.getters.isLoggedIn);
    return {
      isLoggedIn,
    };
  },
};
</script>

<style scoped>
.router-link-exact-active {
  background-color: rgb(21, 75, 175);
  color: whitesmoke;
  border-radius: 10px;
  transition: all 0.1s ease-in;
}
</style>
