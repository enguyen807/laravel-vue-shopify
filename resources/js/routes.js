import VueRouter from "vue-router";

import Example from "./components/ExampleComponent"
import Login from "./components/LoginComponent";
import Register from "./components/RegisterComponent";

const routes = [
    { path: "/", name: "example", component: Example },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register }
];

const router = new VueRouter({
  mode: "history",
  routes,
});


export default router;

