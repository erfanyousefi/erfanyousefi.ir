export default [{
        path: "/blogs",
        name: "blogs",
        component: () =>
            import ("@/views/client/Blogs.vue")
    },
    {
        path: "/blogs/:slug",
        name: "blogPage",
        component: () =>
            import ("@/views/client/BlogPage.vue")
    },
    {
        path: "/blogs/lesson/:slug",
        name: "lessonPage",
        component: () =>
            import ("@/views/client/BlogPage.vue")
    }
]