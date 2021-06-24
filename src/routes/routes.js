

export default [
    {
        name : "index",
        path : "",
        component : import("@/views/ClientTemplate.vue"),
        children : [
            {
                name : "home",
                path : "",
                component : import("@/views/client/Home.vue")
            }
        ]
    }
]