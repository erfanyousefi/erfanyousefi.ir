<template>
  <li class="nav-item dropdown no-arrow mx-1">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      id="alertsDropdown"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="fas fa-bell fa-fw"></i>
      <!-- Counter - Alerts -->
      <span class="badge badge-danger badge-counter">3+</span>
    </a>
    <!-- Dropdown - Alerts -->
    <div
      class="dropdown-list alertsDropdown dropdown-menu dropdown-menu-right shadow animated--grow-in"
      aria-labelledby="alertsDropdown"
    >
      <h6 class="dropdown-header">هشدار ها</h6>
      <a class="dropdown-item d-flex align-items-center" href="#">
        <div class="mr-3">
          <div class="icon-circle bg-primary">
            <i class="fas fa-file-alt text-white"></i>
          </div>
        </div>
        <div>
          <div class="small text-gray-500">12 اردیبهشت 1400</div>
          <span class="font-weight-bold">فایل های دریافتی جدید</span>
        </div>
      </a>
      <a class="dropdown-item d-flex align-items-center" href="#">
        <div class="mr-3">
          <div class="icon-circle bg-success">
            <i class="fas fa-donate text-white"></i>
          </div>
        </div>
        <div>
          <div class="small text-gray-500">4 خرداد 1400</div>
          درآمئ این ماه به حسابتون واریز شد
        </div>
      </a>
      <a class="dropdown-item d-flex align-items-center" href="#">
        <div class="mr-3">
          <div class="icon-circle bg-warning">
            <i class="fas fa-exclamation-triangle text-white"></i>
          </div>
        </div>
        <div>
          <div class="small text-gray-500">8 تیر 1400</div>
          مشکل در ثبت اخبار جدید
        </div>
      </a>
      <a class="dropdown-item text-center small text-gray-500" href="#">اعلانات بیشتر</a>
    </div>
  </li>
</template>

<script>
export default {};
</script>

<style></style>
