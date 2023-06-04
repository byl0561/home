<template>
  <div class="links">
    <div class="line">
      <Icon size="20">
        <Link />
      </Icon>
      <span class="title">星球导航</span>
    </div>
    <el-row class="link-all" :gutter="20">
      <el-col
        :span="8"
        v-for="(item, index) in linksData"
        :key="item"
        @click="jumpLink(item.link)"
      >
        <div
          class="item cards"
          :style="'margin-bottom: 20px'"
        >
          <Icon size="26">
            <component :is="item.icon" />
          </Icon>
          <span class="name">{{ item.name }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@vicons/utils";
import {
  Link,
  Blog,
  CompactDisc,
  Cloud,
  Road,
  Book,
  PhotoVideo,
  Comments,
} from "@vicons/fa";

// 网站链接数据
// 建议不要超出6个，若需要超出请自行调整样式
let linksData = [
  {
    icon: Road,
    name: "履历",
    link: "https://cv.lavaplanets.com/",
  },
  {
    icon: Blog,
    name: "博客",
    link: "https://blog.lavaplanets.com/",
  },
  {
    icon: Cloud,
    name: "NAS",
    link: "https://nas.lavaplanets.com/",
  },
  {
    icon: CompactDisc,
    name: "影音",
    link: "https://media.lavaplanets.com/",
  },
  {
    icon: Book,
    name: "书库",
    link: "https://book.lavaplanets.com/",
  },
  {
    icon: PhotoVideo,
    name: "图床",
    link: "https://image.lavaplanets.com/",
  },
  {
    icon: Comments,
    name: "GPT",
    link: "https://chatgpt.lavaplanets.com/",
  },
];

// 链接跳转
const jumpLink = (url) => {
  window.open(url, "_blank");
};
</script>

<style lang="scss" scoped>
.links {
  .line {
    margin: 2rem 0.25rem 1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    animation: fade;
    -webkit-animation: fade 0.5s;
    .title {
      margin-left: 8px;
      font-size: 1.15rem;
      text-shadow: 0 0 5px #00000050;
    }
  }
  .link-all {
    .item {
      height: 100px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      animation: fade;
      -webkit-animation: fade 0.5s;

      &:hover {
        transform: scale(1.02);
        background: rgb(0 0 0 / 40%);
        transition: 0.3s;
      }
      .name {
        font-size: 1.1rem;
        margin-left: 8px;
      }
      @media (min-width: 720px) and (max-width: 820px) {
        .name {
          display: none;
        }
      }
      @media (max-width: 720px) {
        height: 80px;
      }
      @media (max-width: 460px) {
        flex-direction: column;
        .name {
          font-size: 1rem;
          margin-left: 0;
          margin-top: 8px;
        }
      }
    }
  }
}
</style>