<template>
  <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
    <thead>
      <tr>
        <th>#</th>
        <th>عنوان</th>
        <th>مدرس</th>
        <th>هزینه دوره</th>
        <th>تخفیف</th>
        <th>طول دوره</th>
        <th>تعداد ثبت نامی</th>
        <th>تنظیمات</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>#</th>
        <th>عنوان</th>
        <th>***مدرس***</th>
        <th>هزینه_دوره</th>
        <th>تخفیف</th>
        <th>طول دوره</th>
        <th>نوع</th>
        <th>تنظیمات</th>
      </tr>
    </tfoot>
    <tbody>
      <tr v-for:="(course, index) in courses">
        <td>{{ index + 1 }}</td>
        <td>{{ course.title }}</td>
        <td>{{ course.teacher.name || '---' }}</td>
        <td>{{ course.price }}</td>
        <td>{{ course.discount + " %" }}</td>
        <td>{{ course.totalTime }}</td>
        <td>
          {{ course.type == "cash" ? "نقدی" : course.type == "free" ? "رایگان" : "-" }}
        </td>
        <td>
          <a
            @click="removeCourse(course._id)"
            class="btn btn-danger btn-sm btn-circle mx-1"
          >
            <i class="fas fa-trash"></i
          ></a>
          <router-link
            :to="{ name: 'editCourse', params: { id: course._id } }"
            class="btn btn-info btn-sm btn-circle mx-1"
          >
            <i class="fas fa-pen"></i>
          </router-link>
          <router-link
            :to="{ name: 'coursePage', params: { slug: course.slug } }"
            class="btn btn-success btn-sm btn-circle mx-1"
          >
            <i class="fas fa-eye"></i
          ></router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Swal from "sweetalert2";
import { HTTP } from "@/controller/http.js";
import { useStore } from "vuex";
export default {
  components: {},
  props: {
    courses: Array,
  },
  setup() {
    let store = useStore();
    function removeCourse(id) {
      Swal.fire({
        text:
          "آیا شما مایل به حذف دوره میباشید؟ در صورت حذف تمامی اپیزود های مربوط به آن دوره حذف خواهند شد",
        confirmButtonText: "حذف",
        showCancelButton: true,
        icon: "question",
        focusCancel: true,
        cancelButtonText: "انصراف",
      }).then((remove) => {
        if (remove.isConfirmed) {
          HTTP.delete(`panel/course/${id}`).then((course) => {
            store.commit("setCourseListUpdate", true);
            if (course.data.status) {
              Swal.fire({
                text: "دوره با موفقیت حذف شد",
                icon: "success",
                confirmButtonText: "بستن",
              });
            } else {
              Swal.fire({
                text: "دوره حذف نشد لطفا بعدا یا مجددا تلاش بفرمائید",
                icon: "warning",
                confirmButtonText: "بستن",
              });
            }
          });
        }
      });
    }
    return {
      removeCourse,
    };
  },
};
</script>

