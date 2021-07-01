export default [{
        path: "/dashboard/courses",
        name: "coursesList",
        component: () =>
            import ("@/views/cms/Courses.vue")
    },
    {
        path: "/dashboard/course/add",
        name: "addCourse",
        component: () =>
            import ("@/views/cms/AddCourse.vue")
    },
    // {
    //     path: "/courses/:id",
    //     name: "courseMange",
    //     component: () =>
    //         import ("@/views/cms/CoursePage.vue")
    // }
]