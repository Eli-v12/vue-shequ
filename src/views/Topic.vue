<template>
  <div>
    <Container>
      <template #main>
        <div v-if="topic">
          <div class="Toptitle">
            <h2>{{ topic.title }}</h2>
            <span>发布于 {{ last(topic.last_reply_at) }}</span>
            <span>作者 {{ topic.author.loginname }} </span>
            <span>{{ topic.visit_count }} 次浏览</span>
            <span>最后一次编辑是{{ last(topic.last_reply_at) }}前</span>
            <span>
              来自
              {{
                topic.tab === "share"
                  ? "分享"
                  : topic.tab === "ask"
                  ? "问答"
                  : topic.tab === "job"
                  ? "招聘"
                  : ""
              }}
            </span>
          </div>
          <el-button v-if="UserInfo">{{
            topic.is_collect ? "取消收藏" : "收藏"
          }}</el-button>
          <div v-if="topic" class="topic-title">
            <div v-html="topic.content"></div>
          </div>
          <div>
            <Container v-if="topic.replies.length && UserInfo">
              <template #head>
                <span>{{ topic.replies.length }} 回复</span>
              </template>
              <template #section>
                <ul>
                  <li
                    class="reply-item"
                    v-for="reply in topic.replies"
                    :key="reply.id"
                  >
                    <router-link :to="`/user/${reply.author.loginname}`">
                      <img :src="reply.author.avatar_url" alt="" />
                    </router-link>
                    <span class="reply-content" v-html="reply.content"></span>
                    <div>
                      <span class="right">
                        <span
                          :style="{ color: reply.is_uped ? 'red' : '#000' }"
                        >
                          赞
                        </span>
                        <span>{{ reply.ups.length || "" }}</span>
                      </span>
                    </div>
                  </li>
                </ul>
              </template>
            </Container>
            <Container v-if="UserInfo">
              <template #head> <span>添加回复</span><br /> </template>
              <template #main>
                <textarea name="" id="" cols="30" rows="10"></textarea>
              </template>
              <button>提交</button>
            </Container>
          </div>
        </div>
      </template>
    </Container>
  </div>
  <!-- <NotFound text="标题内容不存在" v-else /> -->
</template>

<script>
import Container from "../layout/Container";
import { mapActions, mapState } from "vuex";
// import NotFound from "../views/NotFound";

export default {
  name: "Topic",
  components: {
    Container,
    // NotFound,
  },
  created() {
    const { id } = this.$route.params;
    console.log(id);
    this.getTopic(id);
  },
  computed: {
    ...mapState(["topic", "UserInfo"]),
    last() {
      return function (item) {
        return this.$moment(item).fromNow();
      };
    },
  },
  methods: {
    ...mapActions(["getTopic"]),
  },
};
</script>

<style lang="stylus">
.Toptitle
  h2
    margin 0
    padding 10px 0 
  span
    font-size 14px
    color #838383
  span:before
    content " • "
.markdown-text
  padding 0 20px
  h1,h2,h3
    border-bottom 1px solid #ccc
    padding-bottom 10px
  h1
    font-size 28px
    code
      color #d14
  ul>li,ol>li
    padding 0
    border-bottom none
    display block
    margin-left 10px
    padding 10px 0
  table>th,tbody>td
    border 1px solid #ccc
    text-align left
    margin 0
    padding 15px 13px
    line-height 30px
  table
    padding 0
    border-collapse collapse
    border-spacing 0
    font-size 100%
    font inherit
  pre
    font-size 14px
    border-radius 0
    padding 0 15px
    border none
    margin 20px -10px
    border-width 1px 0
    background #f7f7f7
    -o-tab-size 4
    -moz-tab-size 4
    tab-size 4
  p
    font-size 16px
    line-height 30px
    overflow auto
  a
    color #778087
    text-decoration none
  a:hover
    color #08c
    text-decoration underline
.reply-item
  display flex
  border-top 1px solid #ccc
  padding 0 10px
  align-items center
  img
    width 40px
    height 40px
  .reply-content
    flex-grow 1
  .right
    flex-shrink 0 
</style>
