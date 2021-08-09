export default [{
        path: "/dashboard/blogs/add",
        name: "addBlog",
        component: () =>
            import ("@/views/cms/blog/AddBlog.vue")
    },
    {
        path: "/dashboard/blogs",
        name: "blogsList",
        component: () =>
            import ("@/views/cms/blog/Blogs.vue")
    },
    {
        path: "/dashboard/blogs/:id",
        name: "editBlog",
        component: () =>
            import ("@/views/cms/blog/EditBlog.vue")
    },
    {
        path: "/dashboard/blogs/lesson/:id",
        name: "addLesson",
        component: () =>
            import ("@/views/cms/blog/AddBlogLesson.vue")
    },
    {
        path: "/dashboard/blogs/lesson/:id",
        name: "editLesson",
        component: () =>
            import ("@/views/cms/blog/EditBlogLesson.vue")
    },
]