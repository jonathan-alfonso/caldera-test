import { createPinia } from "pinia";
import { createApp } from "vue";

import "bootstrap/dist/css/bootstrap.css";
import "@src/assets/styles/index.scss";

import MainContainer from "@src/components/main-container.vue";

const pinia = createPinia();
const app = createApp(MainContainer);

app.use(pinia).mount("#container");

import "bootstrap/dist/js/bootstrap.js";
