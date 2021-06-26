export default [{
        path: "/courses",
        name: "courses",
        component: () =>
            import ("@/views/client/Courses.vue")
    },
    {
        path: "/courses/:slug",
        name: "coursePage",
        component: () =>
            import ("@/views/client/CoursePage.vue")
    }
]