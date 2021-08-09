<template>
  <div class="row">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>نام و نام خانوادگی</th>
          <th>ایمیل</th>
          <th>دوره های ثبت نامی کاربر</th>
          <th>تنظیمات</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>#</th>
          <th>نام و نام خانوادگی</th>
          <th>ایمیل</th>
          <th>دوره های ثبت نامی کاربر</th>
          <th>تنظیمات</th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for:="(user, key) in users" :key="key">
          <td>{{ key + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.courses.length }}</td>
          <td>
            <a
              @click.prevent="removeUser(user._id)"
              class="btn btn-circle btn-danger btn-sm mx-1"
            >
              <i class="fas fa-trash"></i>
            </a>
            <router-link :to="{name : 'editUser', params : {id : user._id}}"
              class="btn btn-circle btn-info btn-sm mx-1"
            >
              <i class="fas fa-pen"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { HTTP } from "@/controller/http.js";
import { useStore } from "vuex";
import Swal from "sweetalert2";
export default {
  props: {
    users: Array,
  },
  components: {},
  setup() {
    let store = useStore();
    function removeUser(id) {
      Swal.fire({
        text:
          "آیا شما مای به حذف کاربر میباشید؟ در صورت تایید تمامی محتوا، دوره، و فعالیت های مربوط به کاربر نیز حذف خواهد شد",
        icon: "question",
        showCancelButton: true,
        focusCancel: true,
        cancelButtonText: "انصراف",
        confirmButtonText: "حذف",
      }).then((remove) => {
        if (remove.isConfirmed) {
          HTTP.delete(`panel/user/${id}`).then((response) => {
            if (response.data.status) {
              store.commit("setUserListUpdate", true);
              Swal.fire({
                text: "کاربر با موفقیت حذف شد",
                icon: "success",
                confirmButtonText: "بستن",
              });
            } else {
              Swal.fire({
                text: "کاربر حذف نشد لطفا بعدا یا مجددا تلاش کنید",
                icon: "warning",
                confirmButtonText: "بستن",
              });
            }
          });
        }
      });
    }
    return {
      removeUser,
    };
  },
};
</script>

<style></style>
