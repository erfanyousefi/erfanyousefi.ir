export default [{
        path: "/login",
        name: "loginPage",
        component: () =>
            import ("@/views/auth/Login.vue")
    }, {
        path: "/signup",
        name: "signupPage",
        component: () =>
            import ("@/views/auth/Signup.vue")
    }

]