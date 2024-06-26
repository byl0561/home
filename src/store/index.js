import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
    state: () => {
        return {
            imgLoadStatus: false, // 壁纸加载状态
            logoLoadStatus: false, // logo加载状态
            innerWidth: null, // 当前窗口宽度
            coverType: "1", // 壁纸种类
            boxOpenState: false, // 盒子开启状态
            mobileOpenState: false, // 移动端开启状态
            mobileFuncState: false, // 移动端功能区开启状态
            footerBlur: true, // 底栏模糊
        };
    },
    getters: {
        // 获取页面宽度
        getInnerWidth(state) {
            return state.innerWidth;
        },
    },
    actions: {
        // 更改当前页面宽度
        setInnerWidth(value) {
            this.innerWidth = value;
            if (value >= 720) {
                this.mobileOpenState = false;
                this.mobileFuncState = false;
            }
        },
        // 更改壁纸加载状态
        setImgLoadStatus(value) {
            this.imgLoadStatus = value;
        },
        // 更改LOGO加载状态
        setLogoLoadStatus(value) {
            this.logoLoadStatus = value;
        },
    },
    persist: {
        key: "data",
        storage: window.localStorage,
        paths: [
            "coverType",
            "footerBlur",
        ],
    },
});