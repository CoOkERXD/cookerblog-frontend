<template>
  <div v-html="IndexArticle.content"></div>
</template>

<script>
import { GetIndexPage } from "../HttpRequest/MainRequest";
import { onMounted, reactive, toRefs } from "vue";

export default {
  setup() {
    const indexInfo = reactive({
      IndexArticle: {},
      getInfo: async () => {
        indexInfo.IndexArticle = await GetIndexPage();
      },
    });
    onMounted(async () =>{
        await indexInfo.getInfo()
    });
    return { ...toRefs(indexInfo) };
  },
};
</script>
