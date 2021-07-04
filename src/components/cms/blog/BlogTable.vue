<template>
  <div class="container-fluid">
    <div class="card shadow mb-4">
      <div class="card-header py-3 courseTable">
        <h6 class="m-0 font-weight-bold text-primary">لیست مقالات</h6>
        <router-link
          :to="{ name: 'addBlog' }"
          class="btn btn-sm btn-primary btn-icon-split"
        >
          <span class="icon text-white">
            <i class="fas fa-plus"></i>
          </span>
          <span class="text">افزودن مقاله</span>
        </router-link>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>#</th>
                <th>عنوان</th>
                <th>نویسنده</th>
                <th>تاریخ</th>
                <th>تنظیمات</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>#</th>
                <th>عنوان</th>
                <th>نویسنده</th>
                <th>تاریخ</th>
                <th>تنظیمات</th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for:="(blog, index) in blogs">
                <td>{{ index + 1 }}</td>
                <td>{{ blog.title }}</td>
                <td>{{ blog.author.name }}</td>
                <td>{{ new Date(blog.createdAt).toLocaleString("fa") }}</td>
                <td>
                  <a class="btn btn-danger btn-sm btn-circle mx-1">
                    <i class="fas fa-trash"></i
                  ></a>
                  <router-link
                    :to="{ name: 'editBlog', params: { id: blog._id } }"
                    class="btn btn-info btn-sm btn-circle mx-1"
                  >
                    <i class="fas fa-pen"></i>
                  </router-link>
                  <router-link :to="{name : 'blogPage', params : {slug : blog.slug}}" class="btn btn-success btn-sm btn-circle mx-1">
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
    blogs: Array,
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
