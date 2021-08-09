<template>
  <li class="nav-item dropdown no-arrow d-sm-none">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      id="searchDropdown"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="fas fa-search fa-fw"></i>
    </a>
    <!-- Dropdown - Messages -->
    <div
      class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
      aria-labelledby="searchDropdown"
    >
      <form class="form-inline mr-auto w-100 navbar-search">
        <div class="input-group" dir="ltr">
          <div class="input-group-append">
            <button class="btn btn-primary" type="button">
              <i class="fas fa-search fa-sm"></i>
            </button>
          </div>
          <input
            type="text"
            class="form-control bg-light border-0 small"
            placeholder="جستجو "
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
        </div>
      </form>
    </div>
  </li>
</template>

<script>
export default {};
</script>

<style></style>
