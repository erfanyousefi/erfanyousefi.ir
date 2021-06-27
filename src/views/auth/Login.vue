<template>
  <div class="row text-center">
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <div class="card card-signin my-5">
        <div class="card-body">
          <h5 class="card-title text-center">ورود به حساب کاربری</h5>
          <form class="form-signin">
            <div class="form-label-group">
              <input
                type="email"
                id="inputEmail"
                class="form-control"
                placeholder="ایمیل"
                required
                autofocus
              />
              <label for="inputEmail">آدرس ایمیل</label>
            </div>

            <div class="form-label-group">
              <input
                type="password"
                id="inputPassword"
                class="form-control"
                placeholder="رمز عبور"
                required
              />
              <label for="inputPassword">رمز عبور</label>
            </div>

            <button
              class="btn btn-lg btn-primary btn-block text-uppercase"
              type="submit"
            >
              ورود به حساب کاربری
            </button>
            <hr class="my-4" />
            <button
              class="btn btn-lg btn-secondary btn-block text-uppercase"
              type="submit"
            >
              ثبت نام
            </button>
            <br />
            <router-link to="" class="btn btn-lg text-primary">
              رمز خود را فراموش کرده ام
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "@/controller/LocalStorage.js"
export default {
  beforeRouteEnter(to, from, next) {
    let token = storage.get("user-token");
    if (token) {
      next({ name: "homePage" });
    }
    next();
  },
};
</script>

<style scoped>
* {
  font-family: iranSans;
}
.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 5px 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
  text-align: center;
}

.form-signin {
  width: 100%;
  text-align: center;
}

.form-signin .btn {
  font-size: 13px;
  border-radius: 10px;
  font-weight: bold;
  padding: 10px;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin: 30px auto;
}

.form-label-group input {
  height: auto;
  border-radius: 10px;
  box-shadow: unset;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(10px) var(20px);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 35px;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  top: 0;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  left: 40px;
  color: #777;
  top: -20px;
  background: white;
  width: fit-content;
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>