<template>
  <!-- 加载 -->
  <Loading v-if="!loadStatus"/>
  <!-- 壁纸 -->
  <Background v-show="store.imgLoadStatus"/>
  <!-- 主界面 -->
  <Transition name="fade" mode="out-in" v-show="store.logoLoadStatus">
    <main id="main" v-if="store.imgLoadStatus">
      <div class="container">
        <section class="all">
          <MainLeft />
          <MainRight v-show="!store.boxOpenState" />
        </section>
      </div>
      <!-- 移动端菜单按钮 -->
      <Icon
          class="menu"
          size="24"
          @click="store.mobileOpenState = !store.mobileOpenState"
      >
        <component :is="store.mobileOpenState ? CloseSmall : HamburgerButton" />
      </Icon>
      <!-- 页脚 -->
      <Transition name="fade" mode="out-in">
        <Footer/>
      </Transition>
    </main>
  </Transition>
</template>
<script setup>
import { helloInit, checkDays } from "@/utils/getTime.js";
import { HamburgerButton, CloseSmall } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import { Icon } from "@vicons/utils";
import Loading from "@/components/Loading.vue";
import MainLeft from "@/components/Left.vue";
import MainRight from "@/components/Right.vue";
import Background from "@/components/Background.vue";
import Footer from "@/components/Footer.vue";
import cursorInit from "@/utils/cursor.js";

const store = mainStore();

// 页面宽度
const getWidth = () => {
  store.setInnerWidth(window.innerWidth);
};

// 加载状态
const loadStatus = computed(() => store.imgLoadStatus && store.logoLoadStatus)

// 加载完成事件
const loadComplete = () => {
  nextTick(() => {
    // 欢迎提示
    helloInit();
    // 默哀模式
    checkDays();
  });
};

// 监听加载完成
watch(
    loadStatus,
    (value) => {
      if (value) {
        loadComplete()
      }
    }
);

// 监听宽度变化
watch(
    () => store.innerWidth,
    (value) => {
      if (value < 990) {
        store.boxOpenState = false;
      }
    },
);

onMounted(() => {
  // 自定义鼠标
  cursorInit();

  // 屏蔽右键
  document.oncontextmenu = () => {
    ElMessage({
      message: "为了浏览体验，本站禁用右键",
      grouping: true,
      duration: 2000,
    });
    return false;
  };

  // 监听当前页面宽度
  getWidth();
  window.addEventListener("resize", getWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", getWidth);
});
</script>

<style lang="scss" scoped>
#main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.2);
  transition: transform 0.3s;
  animation: fade-blur-main-in 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.5s;
  .container {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    .all {
      width: 100%;
      height: 100%;
      padding: 0 0.75rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .more {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000080;
      backdrop-filter: blur(20px);
      z-index: 2;
      animation: fade 0.5s;
    }
    @media (max-width: 1200px) {
      padding: 0 2vw 46px 2vw;
    }
  }
  .menu {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 84%;
    left: calc(50% - 28px);
    width: 56px;
    height: 34px;
    background: rgb(0 0 0 / 20%);
    backdrop-filter: blur(10px);
    border-radius: 6px;
    transition: transform 0.3s;
    animation: fade 0.5s;
    &:active {
      transform: scale(0.95);
    }
    .i-icon {
      transform: translateY(2px);
    }
    @media (min-width: 721px) {
      display: none;
    }
  }
}
</style>