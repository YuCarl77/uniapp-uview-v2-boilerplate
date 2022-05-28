import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

App.mpType = "app";

import uView from "uview-ui";
Vue.use(uView);

import { router, RouterMount } from "@/router";
Vue.use(router);

import store from "@/store";

const app = new Vue({ ...App, store });

import registerHttp from "@/request";
registerHttp(app);

// #ifdef H5
RouterMount(app, router, "#app");
// #endif

// #ifndef H5
app.$mount();
// #endif
