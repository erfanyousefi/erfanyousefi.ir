<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href=""
    >
      <div class="sidebar-brand-icon ">
        <img class="rounded-circle" src="@/assets/dist/cms/img/avatar-profile.png" width="50" alt="..." />
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
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-video"></i>
        <span>دوره</span>
      </a>
      <div
        id="collapseTwo"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">دوره ها</h6>
          <router-link to="/dashboard/courses" class="collapse-item" href=""> دوره ها</router-link>
          <a class="collapse-item" href="">فصل ها</a>
          <a class="collapse-item" href="">ویدئو ها</a>
        </div>
      </div>
    </li>

    <!-- Nav Item - Utilities Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseUtilities"
        aria-expanded="true"
        aria-controls="collapseUtilities"
      >
        <i class="fas fa-fw fa-newspaper"></i>
        <span>مقالات</span>
      </a>
      <div
        id="collapseUtilities"
        class="collapse"
        aria-labelledby="headingUtilities"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">مدیریت مقالات :</h6>
          <a class="collapse-item" href="utilities-color.html">مقالات</a>
          <a class="collapse-item" href="utilities-border.html">فصل ها</a>
          <a class="collapse-item" href="utilities-animation.html">بخش ها</a>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapsedPodcast"
        aria-expanded="true"
        aria-controls="collapsedPodcast"
      >
        <i class="fas fa-fw fa-microphone"></i>
        <span>پادکست ها</span>
      </a>
      <div
        id="collapsedPodcast"
        class="collapse"
        aria-labelledby="headingUtilities"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">مدیریت  :</h6>
          <a class="collapse-item" href="utilities-color.html">پادکست ها</a>
          <a class="collapse-item" href="utilities-border.html">افزودن</a>
        </div>
      </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">تصاویر</div>

    <!-- Nav Item - Pages Collapse Menu -->
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
          <a class="collapse-item" >فراموشی رمز عبور</a>
          <div class="collapse-divider"></div>
          <h6 class="collapse-header">دیگر صفحات :</h6>
          <a class="collapse-item">صفحه 404 </a>
        </div>
      </div>
    </li>

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

    <!-- Nav Item - Tables -->

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
export default {
  setup() {},
};
</script>

<style></style>
