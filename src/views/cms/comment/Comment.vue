<template>
  <div class="row">
    <Title title="نظرات کاربران" />
    <CardBody>
      <template v-slot:title>
        <div>
          <router-link
            :to="{ path: '/dashboard' }"
            class="btn btn-sm btn-danger btn-icon-split"
          >
            <span class="icon text-white">
              <i class="fas fa-arrow-right"></i>
            </span>
            <span class="text">بازگشت</span>
          </router-link>
        </div>
      </template>
      <template v-slot:card>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>نظر کاربر</th>
                <th>کاربر</th>
                <th>کاربرتاریخ ارسال</th>
                <th>مقاله</th>
                <th>دوره</th>
                <th>تنظیمات</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>#</th>
                <th>نظر کاربر</th>
                <th>کاربر</th>
                <th>کاربرتاریخ ارسال</th>
                <th>مقاله</th>
                <th>دوره</th>
                <th>تنظیمات</th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-if="loading">
                <td colspan="10">
                  <Loading v-if="loading" :loading="loading" />
                </td>
              </tr>
              <tr v-if="comments" v-for:="(comment, key) in comments" :key="key">
                <td>{{ key + 1 }}</td>
                <td @dblclick="showDetails(comment.text)">
                  {{ comment.text.substr(0, 30) + "..." }}
                </td>
                <td @dblclick="showDetails(comment.user.name || comment.user.email)">
                  {{ comment.user.name || comment.user.email }}
                </td>
                <td
                  @dblclick="
                    showDetails(
                      new Date(comment.createdAt).toLocaleString('fa') +
                        '<br/>' +
                        comment.createdAt
                    )
                  "
                >
                  {{ new Date(comment.createdAt).toLocaleString("fa") }}
                </td>
                <td
                  @dblclick="
                    showDetails(comment.blog ? comment.blog.title : 'بدون مقاله')
                  "
                >
                  {{ comment.blog ? comment.blog.title.substr(0, 30) + "..." : "--" }}
                </td>
                <td @dblclick="showDetails(comment.course ? comment.course.title : '--')">
                  {{ comment.course ? comment.course.title.substr(0, 30) + "..." : "--" }}
                </td>
                <td>
                  <button
                    class="btn-sm mx-1 btn btn-circle btn-danger"
                    @click="deleteComment(comment._id)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>

                  <button
                    v-if="comment.show"
                    @click="ignoreComment(comment._id)"
                    class="btn-sm mx-1 btn btn-circle btn-warning"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                  <button
                    v-else
                    class="btn-sm mx-1 btn btn-circle btn-success"
                    @click="acceptComment(comment._id)"
                  >
                    <i class="fas fa-check"></i>
                  </button>
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
import CardBody from "@/components/partials/cms/CardBody.vue";
import { HTTP } from "@/controller/http.js";
import { onBeforeMount, ref } from "@vue/runtime-core";
import Swal from "sweetalert2";
export default {
  components: {
    Title,
    CardBody,
    Loading,
  },
  setup() {
    let comments = ref(null);
    let loading = ref(true);
    function getComments() {
      HTTP.get("panel/comment/all",{progress : false}).then((response) => {
        if (response.data.status) {
          comments.value = response.data.comments;
        } else {
          comments.value = [];
        }
        loading.value = false;
      });
    }
    onBeforeMount(() => getComments());
    function showDetails(value) {
      Swal.fire({ html: value });
    }
    function acceptComment(id) {
      HTTP.get("panel/comment/" + id).then((comment) => {
        console.log(comment);
        if (comment.data.status) {
          Swal.fire({
            text: "تایید کامنت با موفقیت انجام شد",
            icon: "success",
          }).then(() => {
            getComments();
          });
        } else {
          Swal.fire({
            text: "تایید نظر انجام نشد لطفا بعدا یا مجددا تلاش کنید ",
            icon: "warning",
          });
        }
      });
    }
    function ignoreComment(id) {
      HTTP.get("panel/comment/ignore/" + id).then((comment) => {
        console.log(comment);
        if (comment.data.status) {
          Swal.fire({
            text: "رد کردن کامنت با موفقیت انجام شد",
            icon: "success",
          }).then(() => {
            getComments();
          });
        } else {
          Swal.fire({
            text: "تایید نظر انجام نشد لطفا بعدا یا مجددا تلاش کنید ",
            icon: "warning",
          });
        }
      });
    }
    function deleteComment(id) {
      Swal.fire({
        text: "آیا شما مایل به حذف نظر میباشید؟!",
        icon: "question",
        showCancelButton: true,
        focusCancel: true,
        cancelButtonText: "انصراف",
        confirmButtonText: "حذف",
        iconHtml: "؟",
      }).then((response) => {
        if (response.isConfirmed) {
          HTTP.delete("panel/comment/" + id).then((response) => {
            if (response.data.status) {
              Swal.fire({
                text: "حذف نظر با موفقیت انجام شد",
                icon: "success",
              }).then(() => {
                getComments();
              });
            } else {
              Swal.fire({
                text: "حذف نظر انجام نشد لطفا بعدا یا مجددا تلاش کنید",
                icon: "warning",
              });
            }
          });
        }
      });
    }
    return {
      comments,
      loading,
      showDetails,
      ignoreComment,
      acceptComment,
      deleteComment,
    };
  },
};
</script>

<style>
td {
  width: 15%;
}
</style>
