<template>
  <div>
    <div id="upMenu">
      <a href="" class="btn btn-green" id="login">
        <img src="@/assets/dist/img/login.png" alt="" />
      </a>
      <a href="" class="btn btn-blue" id="signup">
        <img src="@/assets/dist/img/signup.png" alt="" />
      </a>
    </div>
    <div id="logo">
      <img src="@/assets/dist/img/logo.png" alt="" />
    </div>
    <header class="bg-white">
      <nav id="nav" class="nav">
        <a href="" class="openMenuBtn">منو</a>
        <div class="hamburger hamburger--demo-6 js-hover">
          <div class="hamburger__line hamburger__line--01">
            <div
              class="
                hamburger__line-in
                hamburger__line-in--01
                hamburger__line-in--demo-5
              "
            ></div>
          </div>
          <div class="hamburger__line hamburger__line--02">
            <div
              class="
                hamburger__line-in
                hamburger__line-in--02
                hamburger__line-in--demo-5
              "
            ></div>
          </div>
          <div class="hamburger__line hamburger__line--03">
            <div
              class="
                hamburger__line-in
                hamburger__line-in--03
                hamburger__line-in--demo-5
              "
            ></div>
          </div>
          <div class="hamburger__line hamburger__line--cross01">
            <div
              class="
                hamburger__line-in
                hamburger__line-in--cross01
                hamburger__line-in--demo-5
              "
            ></div>
          </div>
          <div class="hamburger__line hamburger__line--cross02">
            <div
              class="
                hamburger__line-in
                hamburger__line-in--cross02
                hamburger__line-in--demo-5
              "
            ></div>
          </div>
        </div>
        <div class="titleUp">وبسایت آموزشی عرفان یوسفی</div>
        <ul>
          <li>
            <router-link to="/" class="link"
              >کافه</router-link
            >
          </li>
          <li><router-link :to="{name : 'blogs'}">بلاگ ها</router-link></li>
          <li><router-link :to="{name : 'courses'}">دوره ها</router-link></li>
          <li>
            <router-link to="">سرریز قهوه</router-link>
          </li>
          <li><router-link to="">ایده ها</router-link></li>
          <li><router-link to="">جملات</router-link></li>
          <li>
            <router-link to="">تماس با من</router-link>
          </li>
          <li><router-link to="">درباره من</router-link></li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.router-link-exact-active {
  background-color: rgb(21, 75, 175);
  color: whitesmoke;
  border-radius: 10px;
  transition: all 0.1s ease-in;
}
</style>