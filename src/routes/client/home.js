export default [{
        path: "",
        name: "homePage",
        component: () => {
            return import ("@/views/client/Home.vue")
        }
    },
    {
        path: '/404',
        name: "notfound",
        component: () =>
            import ("@/views/errors/PageNotFound.vue")
    },
    {
        path: '/contact-us',
        name: "contactus",
        component: () =>
            import ("@/views/client/ContactUs.vue")
    }, {
        path: '/podcasts',
        name: "podcasts",
        component: () =>
            import ("@/views/client/Podcasts.vue")
    },
]