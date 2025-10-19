import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
import "./style.css";
import "./theme.js";

const app = createApp(App);

app.component("Toaster", Toaster);
app.use(router);
app.mount("#app");
