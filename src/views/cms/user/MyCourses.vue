<template>
  <div class="row">
    <Title title="دوره های که در آنها شرکت کرده اید" />
    <CardBody>
      <template v-slot:title>
        <router-link
          :to="{ path: '/dashboard' }"
          class="btn btn-sm btn-danger btn-icon-split"
        >
          <span class="icon text-white">
            <i class="fas fa-arrow-right"></i>
          </span>
          <span class="text">بازگشت</span>
        </router-link>
      </template>
      <template v-slot:card>
        <div class="row" v-if="loading">
          <Loading :loading="loading" />
        </div>
        <div v-else>
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>#</th>
                <th>عنوان</th>
                <th>مدرس</th>
                <th>هزینه دوره</th>
                <th>تخفیف</th>
                <th>طول دوره</th>
                <th>نوع</th>
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
            <tbody v-if="user">
              <tr v-if="!user.courses.length">
                <td colspan="10">
                  شما در هیچ دوره ای ثبت نام نکرده اید.
                  <router-link :to="{ name: 'courses' }" target="_blank"
                    >مشاهده همه دوره ها</router-link
                  >
                </td>
              </tr>
              <tr v-else v-for:="(course, index) in user.courses">
                <td>{{ index + 1 }}</td>
                <td>{{ course.title }}</td>
                <td>{{ course.teacher.name || "---" }}</td>
                <td>{{ course.price }}</td>
                <td>{{ course.discount + " %" }}</td>
                <td>{{ course.totalTime }}</td>
                <td>
                  {{
                    course.type == "cash"
                      ? "نقدی"
                      : course.type == "free"
                      ? "رایگان"
                      : "-"
                  }}
                </td>
                <td>
                  <router-link
                  target="_blank"
                    :to="{ name: 'coursePage', params: { slug: course.slug } }"
                    class="btn btn-success btn-sm btn-circle mx-1"
                  >
                    <i class="fas fa-eye"></i
                  ></router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </CardBody>
  </div>
</template>

<script>
import Title from "@/components/partials/cms/Title.vue";
import Loading from "@/components/partials/Loading.vue";
import dotenv from "@/dotenv.js";
import { onBeforeMount, ref } from "@vue/runtime-core";
import { HTTP } from "@/controller/http.js";
import { useRouter } from "vue-router";
import CardBody from "@/components/partials/cms/CardBody.vue";
import Swal from "sweetalert2";
export default {
  components: {
    Loading,
    Title,
    CardBody,
  },
  setup() {
    let router = useRouter();
    let loading = ref(true);
    let user = ref(null);
    function getUser() {
      HTTP.get("panel/user/details").then((response) => {
        if (response.data.status) {
          user.value = response.data.user;
          console.log(user.value);
        } else {
          Swal.fire({
            text: "مشخصات کاربری یافت نشد، لطفا در حساب خود مجددا وارد شوید",
          }).then(() => {
            router.push({ name: "logout" });
          });
        }
      });
      loading.value = false;
    }
    onBeforeMount(() => {
      getUser();
    });
    return {
      user,
      loading,
      dotenv,
    };
  },
};
</script>

<style></style>
