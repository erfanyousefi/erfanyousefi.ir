<template>
  <li class="nav-item dropdown no-arrow mx-1">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      id="messagesDropdown"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="fas fa-envelope fa-fw"></i>
      <!-- Counter - Messages -->
      <span class="badge badge-danger badge-counter">7</span>
    </a>
    <!-- Dropdown - Messages -->
    <div
      class="dropdown-list messagesDropdown dropdown-menu dropdown-menu-right shadow animated--grow-in"
      aria-labelledby="messagesDropdown"
    >
      <h6 class="dropdown-header">پیغام ها</h6>
      <a class="dropdown-item d-flex align-items-center" href="#">
        <div class="dropdown-list-image mr-3">
          <img
            class="rounded-circle"
            src="@/assets/dist/cms/img/undraw_profile_1.svg"
            alt="..."
          />
          <div class="status-indicator bg-success"></div>
        </div>
        <div class="font-weight-bold">
          <div class="text-truncate">سلام چطور میتونم توی دوره جدیدتون ثبت نام کنم</div>
          <div class="small text-gray-500">محمد مرامی · 58m</div>
        </div>
      </a>
      <a class="dropdown-item d-flex align-items-center" href="#">
        <div class="dropdown-list-image mr-3">
          <img
            class="rounded-circle"
            src="@/assets/dist/cms/img/undraw_profile_2.svg"
            alt="..."
          />
          <div class="status-indicator"></div>
        </div>
        <div>
          <div class="text-truncate">میگم پشتیبانی ها به چه شکلی انجام میشه</div>
          <div class="small text-gray-500">مریم گل آرا · 1d</div>
        </div>
      </a>
      <a class="dropdown-item d-flex align-items-center" href="#">
        <div class="dropdown-list-image mr-3">
          <img
            class="rounded-circle"
            src="@/assets/dist/cms/img/undraw_profile_3.svg"
            alt="..."
          />
          <div class="status-indicator bg-warning"></div>
        </div>
        <div>
          <div class="text-truncate">سلام ببخشید شما کار آموز قبول میکنید</div>
          <div class="small text-gray-500">مستر هکر · 2d</div>
        </div>
      </a>
      <a class="dropdown-item d-flex align-items-center" href="#">
        <div class="dropdown-list-image mr-3">
          <img
            class="rounded-circle"
            src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
            alt="..."
          />
          <div class="status-indicator bg-success"></div>
        </div>
        <div>
          <div class="text-truncate">
            سلام هر کاری میکنم نمیتونم توی دوره نود جی استون ثبت نام کنم
          </div>
          <div class="small text-gray-500">سعید ایزدی · 2w</div>
        </div>
      </a>
      <a class="dropdown-item text-center small text-gray-500" href="#"
        >پیغام های بیشتر</a
      >
    </div>
  </li>
</template>

<script>
export default {};
</script>

<style></style>
