export default [{
    path: "",
    name: "index",
    component: () => {
        return import ("@/views/ClientTemplate.vue")
    },
    children: [{
            path: "",
            name: "homePage",
            component: () => {
                return import ("@/views/client/Home.vue")
            }
        },
        {
            path: "/course/:slug",
            name: "coursePage",
            component: () => {
                return import ("@/views/client/CoursePage.vue")
            }
        },
        {
            path: "/courses",
            name: "allCourse",
            component: () => {
                return import ("@/views/client/Courses.vue")
            }
        },

    ]
}]