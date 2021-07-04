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
            import ("@/views/cms/blog/AddBlog.vue")
    },
]