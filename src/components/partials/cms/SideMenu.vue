<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="">
      <div class="sidebar-brand-icon">
        <img
          v-if="user.avatar"
          class="rounded-circle"
          :src="dotenv.baseURL + user.avatar"
          width="50"
          height="50"
        />
        <img
          v-else
          class="rounded-circle"
          src="@/assets/dist/cms/img/avatar-profile.png"
          width="50"
        />
      </div>
      <div class="sidebar-brand-text mx-3">پنل کاربری</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <router-link to="/dashboard/" class="nav-link" href="">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>داشبورد</span></router-link
      >
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">آموزشی</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <router-link to="/dashboard/courses" class="nav-link" href="">
        <i class="fas fa-fw fa-video"></i>
        دوره ها
      </router-link>
    </li>
    <!-- Nav Item - Utilities Collapse Menu -->
    <li class="nav-item">
      <router-link to="/dashboard/blogs" class="nav-link" href="">
        <i class="fas fa-fw fa-newspaper"></i>
        مقالات
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/dashboard/blogs" class="nav-link" href="">
        <i class="fas fa-fw fa-microphone"></i>
        پادکست ها
      </router-link>
    </li>
    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">ارتباطات</div>

    <!-- Nav Item - Charts -->
    <li class="nav-item">
      <a class="nav-link" href="">
        <i class="fas fa-fw fa-commenting"></i>
        <span>نظرات</span></a
      >
    </li>
    <li class="nav-item">
      <a class="nav-link" href="">
        <i class="fas fa-fw fa-envelope"></i>
        <span>پیام ها</span></a
      >
    </li>
    <!-- Nav Item - Pages Collapse Menu -->
    <hr class="sidebar-divider" />
    <li class="nav-item">
      <router-link :to="{ name: 'usersList' }" class="nav-link" href="">
        <i class="fas fa-fw fa-users"></i>
        <span>کاربران</span></router-link
      >
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapsePages"
        aria-expanded="true"
        aria-controls="collapsePages"
      >
        <i class="fas fa-fw fa-folder"></i>
        <span>متفرقه</span>
      </a>
      <div
        id="collapsePages"
        class="collapse"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">بخش ها:</h6>
          <a class="collapse-item">صفحه اصلی</a>
          <a class="collapse-item">ثبت نام</a>
          <a class="collapse-item">ورود</a>
          <a class="collapse-item">فراموشی رمز عبور</a>
          <div class="collapse-divider"></div>
          <h6 class="collapse-header">دیگر صفحات :</h6>
          <a class="collapse-item">صفحه 404 </a>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <router-link to="/dashboard/my-courses" class="nav-link" href="">
        <i class="fas fa-fw fa-video"></i>
       دوره های من
      </router-link>
    </li>
    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center m-auto d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

    <!-- Sidebar Message -->
  </ul>
</template>

<script>
import dotenv from "@/dotenv.js";
import { useStore } from "vuex";
export default {
  setup() {
    let store = useStore();
    let user = store.state.user;
    return {
      dotenv,
      user,
    };
  },
};
</script>

<style></style>
