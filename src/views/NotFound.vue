<template>
  <div>
    <Container>
      <template #head>
        <router-link to="/"><span class="Home">主页</span></router-link>
        <span class="i">/</span>
      </template>
      <template #main>
        <div class="NotFouned">
          <span>{{ text }}</span>
        </div>
        <div class="NotFouned-btn">
          <el-button onclick="javascript:window.history.back(-1);" type="info" plain size="small">返回</el-button>
        </div>
      </template>
    </Container>
  </div>
</template>

<script>
import Container from "../layout/Container";
export default {
  name: "NotFound",
  components: {
    Container,
  },
  props: {
    text: {
      type: String,
      default: "Not Found",
    },
  },
};
</script>

<style lang="stylus">
.NotFouned
  color #b94a48
  background-color: #f2dede;
  padding 10px
  font-weight bold
.NotFouned-btn
  padding 20px 0 0
</style>