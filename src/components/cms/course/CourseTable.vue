<template>
  <div class="container-fluid">
    <div class="card shadow mb-4">
      <div class="card-header py-3 courseTable">
        <h6 class="m-0 font-weight-bold text-primary">لیست دوره ها</h6>
        <router-link
          :to="{ name: 'addCourse' }"
          class="btn btn-sm btn-primary btn-icon-split"
        >
          <span class="icon text-white">
            <i class="fas fa-plus"></i>
          </span>
          <span class="text">افزودن دوره</span>
        </router-link>
      </div>
      <div class="card-body">
        <div class="table-responsive">
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
                <td>{{ course.teacher.name }}</td>
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
                  <a class="btn btn-danger btn-sm btn-circle mx-1">
                    <i class="fas fa-trash"></i
                  ></a>
                  <router-link
                    :to="{ name: 'editCourse', params: { id: course._id } }"
                    class="btn btn-info btn-sm btn-circle mx-1"
                  >
                    <i class="fas fa-pen"></i>
                  </router-link>
                  <router-link :to="{name : 'coursePage', params : {slug : course.slug}}" class="btn btn-success btn-sm btn-circle mx-1">
                    <i class="fas fa-eye"></i
                  ></router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    courses: Array,
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.courseTable {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
