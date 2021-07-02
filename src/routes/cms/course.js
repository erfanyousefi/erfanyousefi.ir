export default [{
        path: "/dashboard/courses",
        name: "coursesList",
        component: () =>
            import ("@/views/cms/course/Courses.vue")
    },
    {
        path: "/dashboard/course/add",
        name: "addCourse",
        component: () =>
            import ("@/views/cms/course/AddCourse.vue")
    },
    {
        path: "/dashboard/course/edit/:id",
        name: "editCourse",
        component: () =>
            import ("@/views/cms/course/EditCourse.vue")
    },
    // {
    //     path: "/courses/:id",
    //     name: "courseMange",
    //     component: () =>
    //         import ("@/views/cms/CoursePage.vue")
    // }
]