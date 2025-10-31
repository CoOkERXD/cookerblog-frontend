<template>
  <div v-html="article.content"></div>
</template>
<script>
import { useRoute } from "vue-router";
import { GetArticleAsync } from "../HttpRequest/PostRequest";
import { onMounted, reactive, toRefs } from "vue";

export default {
  setup() {
    const route = useRoute()
    const categoryName = route.query.categoryName
    const title = route.query.title
    const indexInfo = reactive({
      article: {},
      GetArticleAsync: async () => {
        indexInfo.article = await GetArticleAsync({ categoryName, title })
      }
    })
    onMounted(async () => {
      await indexInfo.GetArticleAsync()
    });
    return { ...toRefs(indexInfo) };
  },
};
</script>