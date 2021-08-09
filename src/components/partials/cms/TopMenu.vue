<template>
  <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <!-- Sidebar Toggle (Topbar) -->
    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
      <i class="fa fa-bars"></i>
    </button>

    <div class="d-inline">
      <router-link :to="{name : 'homePage'}" class="link">صفحه اصلی وبسایت</router-link>
    </div>
    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
      <!-- Nav Item - Search Dropdown (Visible Only XS) -->
      <!-- Nav Item - Alerts -->
      <!-- Nav Item - Messages -->
      <div class="topbar-divider d-none d-sm-block"></div>

      <!-- Nav Item - User Information -->
      <li class="nav-item dropdown no-arrow">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            class="img-profile rounded-circle"
            v-if="user.avatar"
            :src="dotenv.baseURL + user.avatar"
          />
          <img
            v-else
            class="img-profile rounded-circle"
            src="@/assets/dist/cms/img/undraw_profile.svg"
          />
          <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ user.name }}</span>
        </a>
        <!-- Dropdown - User Information -->
        <div
          class="dropdown-menu userDropdown dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <router-link class="dropdown-item" :to ="{name : 'editProfile'}">
            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> پروفایل
          </router-link>
          <router-link class="dropdown-item" :to="{name:'editPassword'}">
            <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> ویرایش رمز عبور
          </router-link>
          <a class="dropdown-item" href="#">
            <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i> لاگ های فعال
          </a>
          <div class="dropdown-divider"></div>
          <router-link
            to="/logout"
            class="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#logoutModal"
          >
            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> خروج
          </router-link>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import dotenv from "@/dotenv.js";
import { watch } from "@vue/runtime-core";
export default {
  setup() {
    let store = useStore();
    let user = store.state.user;
    watch(store.state.user, (newValue) => {
      user = newValue;
    });
    return {
      user,
      dotenv,
    };
  },
};
</script>

<style>
  a, router-link{
    text-decoration: none;
  }
  .link{
    text-decoration: none;
    text-underline-offset: 5px;
  }
</style>
