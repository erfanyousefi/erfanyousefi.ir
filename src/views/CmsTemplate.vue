<template>
  <main id="page-top" dir="rtl">
    <div id="wrapper">
      <SideMenu />
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
            <TopMenu />
            <div class="container-fluid">
              <router-view></router-view>
            </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import("@/assets/dist/cms/admin.css");
import SideMenu from "@/components/partials/cms/SideMenu.vue";
import TopMenu from "@/components/partials/cms/TopMenu.vue";
import ("@/assets/dist/cms/vendor/fontawesome-free/css/all.min.css");
// import ("@/assets/dist/cms/vendor/jquery/jquery.min.js");
import ("@/assets/dist/cms/vendor/bootstrap/js/bootstrap.bundle.min.js");
// import ("@/assets/dist/cms/vendor/jquery-easing/jquery.easing.min.js");
// import ("@/assets/dist/cms/vendor/chart.js/Chart.min.js");
import ("jquery")
import ("jquery.easing")
import ("@/assets/dist/cms/js/sb-admin-2.js");
export default {
  components: {
    SideMenu,
    TopMenu,
  },
};
</script>

<style></style>
