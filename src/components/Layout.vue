<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部 -->
      <el-header class="el-head">
        <!-- 单独把按钮放在 header 最外层，绝对定位靠左 -->
        <el-button @click="toggleCollapse" type="primary" size="large" circle class="toggle-btn-fixed">
          <el-icon>
            <Menu />
          </el-icon>
        </el-button>

        <!-- 头像部分保持居中 -->
        <div class="header-container">
          <div class="header-logo">
            <router-link to="/cookerblog/index" style="display: inline-block;">
              <el-avatar shape="square" :size="95" src="/sheep.jpg" />
            </router-link>
          </div>
        </div>
      </el-header>

      <!-- 侧边栏 + 主内容 -->
      <el-container>
        <el-aside :width="isCollapse ? '0px' : '230px'" class="sidebar">
          <el-menu :collapse="isCollapse" :collapse-transition="true" background-color="#f5f5f5" text-color="#333"
            active-text-color="#409eff" class="menu">
            <el-sub-menu :index="dto.categoryGuid" v-for="dto in TitleWithCategoryDtoes" :key="dto.categoryName">
              <template #title>
                <span>{{ dto.categoryNameForShow }}</span>
              </template>
              <template v-for="title in dto.articleTitles" :key="title.title">
                <el-menu-item :index="`${dto.categoryGuid}-${title.title}`"
                  @click="goToArticle(dto.categoryName, title.title)">{{ title.title }}</el-menu-item>
              </template>
            </el-sub-menu>
          </el-menu>
        </el-aside>

        <el-main class="el-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { GetCategoryWithArticleDto } from "../HttpRequest/CategoryRequest";
import { onMounted, reactive, toRefs, ref } from "vue";

export default {
  setup() {
    const router = useRouter();
    const isCollapse = ref(false);
    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };

    const asideInfo = reactive({
      TitleWithCategoryDtoes: [],
      getInfo: async () => {
        asideInfo.TitleWithCategoryDtoes = await GetCategoryWithArticleDto();
      },
      goToArticle: async (categoryName, title) => {
        router.push({
          path: '/cookerblog/post',
          query: {
            categoryName,
            title
          }
        })
      }
    });

    onMounted(async () => {
      await asideInfo.getInfo();
    });

    return { ...toRefs(asideInfo), isCollapse, toggleCollapse };
  },
};
</script>

<style scoped>
/* 头部容器 */
.el-head {
  border-bottom: 3px solid #dcdfe6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  height: 100px;
  padding: 0;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  position: relative;
  /* 关键：为绝对定位提供参考 */
}

/* 按钮：绝对定位，贴在最左边 */
.toggle-btn-fixed {
  position: absolute;
  left: 20px;
  /* 距离左边 20px */
  top: 50%;
  transform: translateY(-50%);
  /* 垂直居中 */
  z-index: 10;
}

/* 头像容器：居中显示 */
.header-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  /* 头像居中 */
  align-items: center;
  padding: 0 20px;
}

.header-logo {
  display: flex;
  align-items: center;
}

/* 侧边栏基础样式 */
.sidebar {
  background-color: #f5f5f5;
  transition: width 0.3s ease;
  overflow: hidden;
}

/* 菜单样式 */
.menu {
  border: none;
  height: 100%;
}

.menu .el-menu-item,
.menu .el-sub-menu__title {
  padding-left: 20px !important;
}

/* 主内容区 */
.el-main {
  margin-top: 20px;
  margin-left: 20px;
  text-align: center;
  background-color: #f8f9fa;
}
</style>