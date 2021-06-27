import courseRoutes from "@/routes/client/course.js";
import blogRoutes from "@/routes/client/blog.js";
import authRoutes from "@/routes/auth/index.js";
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
            ...courseRoutes,
            ...blogRoutes,
            ...authRoutes,
        ]
    },
    // {
    //     path: '/*',
    //     name: "PageNotFound",
    //     component: () =>
    //         import ("@/views/client/errors/PageNotFound.vue")
    // },
]