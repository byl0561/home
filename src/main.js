import { createApp } from "vue";
import "@/style/style.scss";
import App from "@/App.vue";
// 引入 pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.mount("#app");

// PWAcontrollerchange
navigator.serviceWorker.addEventListener("controllerchange", () => {
    // 弹出更新提醒
    ElMessage("站点已更新，刷新后生效");
});