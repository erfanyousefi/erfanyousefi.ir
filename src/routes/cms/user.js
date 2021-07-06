export default [{
        path: "/dashboard/users",
        name: "usersList",
        component: () =>
            import ("@/views/cms/user/Users.vue")
    },
    {
        path: "/dashboard/user/:id",
        name: "editUser",
        component: () =>
            import ("@/views/cms/user/EditUser.vue")
    },
    {
        path: "/dashboard/profile",
        name: "editProfile",
        component: () =>
            import ("@/views/cms/user/EditProfile.vue")
    },
    {
        path: "/dashboard/edit-password",
        name: "editPassword",
        component: () =>
            import ("@/views/cms/user/EditPassword.vue")
    },
]