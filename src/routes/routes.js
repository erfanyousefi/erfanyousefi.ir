import courseRoutes from "@/routes/client/course.js";
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
        ...courseRoutes
    ]
}]