import courseRoutes from "@/routes/client/course.js";
import blogRoutes from "@/routes/client/blog.js";
import authRoutes from "@/routes/auth/index.js";
import coursePanelRoutes from "@/routes/cms/course.js";
import blogPanelRoutes from "@/routes/cms/blog.js";
import userPanelRoutes from "@/routes/cms/user.js";
import commentPanelRoutes from "@/routes/cms/comment.js";


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
            {
                path: '/404',
                component: () =>
                    import ("@/views/errors/PageNotFound.vue")
            },
            { path: '/:pathMatch(.*)*', redirect: '/404' },
        ]
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => {
            return import ("@/views/CmsTemplate.vue")
        },
        children: [{
                path: "",
                name: "dashboardIndexPage",
                component: () => {
                    return import ("@/views/cms/Index.vue")
                }
            },
            ...coursePanelRoutes,
            ...blogPanelRoutes,
            ...userPanelRoutes,
            ...commentPanelRoutes,
            {
                path: '/dashboard/404',
                component: () =>
                    import ("@/views/errors/PageNotFound.vue")
            },
            { path: '/dashboard:pathMatch(.*)*', redirect: '/dashboard/404' },
        ]
    },
    // {
    //     path: '/*',
    //     name: "PageNotFound",
    //     component: () =>
    //         import ("@/views/client/errors/PageNotFound.vue")
    // },
]