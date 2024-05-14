<template>
  <!-- 基本信息 -->
  <div class="message">
    <!-- Logo -->
    <div class="logo">
      <img class="logo-img"
           :src="siteLogo"
           alt="logo"
           @load="logoLoadComplete" />
    </div>
    <!-- 简介 -->
    <div class="description cards">
      <div class="content">
        <Icon size="16">
          <QuoteLeft />
        </Icon>
        <Transition name="fade" mode="out-in">
          <div :key="descriptionText.hello + descriptionText.text" class="text">
            <p>{{ descriptionText.hello }}</p>
            <p>{{ descriptionText.text }}</p>
          </div>
        </Transition>
        <Icon size="16">
          <QuoteRight />
        </Icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@vicons/utils";
import { QuoteLeft, QuoteRight } from "@vicons/fa";
import { mainStore } from "@/store";
const store = mainStore();
const logoTimeout = ref(null);

// 主页站点logo
const siteLogo = import.meta.env.VITE_SITE_MAIN_LOGO;

// 简介区域文字
const descriptionText = reactive({
  hello: import.meta.env.VITE_DESC_HELLO,
  text: import.meta.env.VITE_DESC_TEXT,
});

// 图片加载完成
const logoLoadComplete = () => {
  logoTimeout.value = setTimeout(
      () => {
        store.setLogoLoadStatus(true);
      },
      Math.floor(Math.random() * (600 - 300 + 1)) + 300,
  );
};
</script>

<style lang="scss" scoped>
.message {
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    animation: fade 0.5s;
    max-width: 460px;
    .logo-img {
      width: 350px;
    }
    @media (max-width: 768px) {
      .logo-img {
        width: 300px;
      }
    }
    @media (max-width: 720px) {
      max-width: 100%;
      justify-content: center;
      .logo-img {
        width: 300px;
      }
    }
    @media (max-width: 340px) {
      .logo-img {
        width: 100%;
      }
    }
  }

  .description {
    padding: 1rem;
    margin-top: 3.5rem;
    max-width: 460px;
    animation: fade 0.5s;

    .content {
      display: flex;
      justify-content: space-between;

      .text {
        margin: 0.75rem 1rem;
        line-height: 2rem;
        margin-right: auto;
        transition: opacity 0.2s;

        p {
          &:nth-of-type(1) {
            font-family: "Pacifico-Regular";
          }
        }
      }

      .xicon:nth-of-type(2) {
        align-self: flex-end;
      }
    }
    @media (max-width: 720px) {
      max-width: 100%;
      pointer-events: none;
    }
  }
  @media (max-width: 390px) {
    .logo {
      flex-direction: column;
    }
    .description {
      margin-top: 2.5rem;
    }
  }
}
</style>