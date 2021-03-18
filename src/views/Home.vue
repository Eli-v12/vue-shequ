<template>
  <div>
    <!-- v-loading="loading" 普通加载-->
    <!-- v-loading.fullscreen.lock="loading" 全局加载-->
    <Container
      v-loading.fullscreen.lock="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <template #head>
        <div class="tabs">
          <!-- @click.native 应用到组件上，相当于给组件的根元素绑定事件 -->
          <!-- exact 是严格匹配，只有点击的那个人才会加上 .router-link-active 起到了改变颜色的效果-->

          <!-- <router-link tag="a"  exact :class="{ 'router-link-active': !$route.query.tab }" to="/?tab=all">全部</router-link> -->
          <!-- <router-link tag="a" exact to="/?tab=good">精华</router-link> -->
          <!-- <router-link tag="a" exact to="/?tab=share">分享</router-link> -->
          <!-- <router-link tag="a" exact to="/?tab=ask">问答</router-link> -->
          <!-- <router-link tag="a" exact to="/?tab=job">招聘</router-link> -->

          <!-- 1203 -->
          <router-link
            tag="a"
            exact
            :class="{
              'router-link-active':
                !$route.query.tab || $route.query.tab === 'all',
            }"
            to="/?tab=all"
            >全部</router-link
          >
          <router-link
            tag="a"
            exact
            :class="{ 'router-link-active': $route.query.tab === 'good' }"
            to="/?tab=good"
            >精华</router-link
          >
          <router-link
            tag="a"
            exact
            :class="{ 'router-link-active': $route.query.tab === 'share' }"
            to="/?tab=share"
            >分享</router-link
          >
          <router-link
            tag="a"
            exact
            :class="{ 'router-link-active': $route.query.tab === 'ask' }"
            to="/?tab=ask"
            >问答</router-link
          >
          <router-link
            tag="a"
            exact
            :class="{ 'router-link-active': $route.query.tab === 'job' }"
            to="/?tab=job"
            >招聘</router-link
          >
        </div>
      </template>
      <template #main>
        <div v-if="!arrText">请等待</div>
        <ul class="list" v-else-if="arrText.length">
          <li class="item" v-for="item in arrText" :key="item.id">
            <span
              v-if="
                $route.query.tab === 'all' ||
                $route.query.tab === 'good' ||
                !$route.query.tab
              "
              :class="[
                'type',
                item.top
                  ? 'top'
                  : item.good
                  ? 'good'
                  : item.tab === 'ask'
                  ? 'ask'
                  : '',
              ]"
              >{{ item | formatType }}
            </span>
            <span class="item_title">
              <router-link :to="`/topic/${item.id}`">
                {{ item.title }}
              </router-link>
            </span>

            <span class="Time">{{ last(item.last_reply_at) }}</span>
          </li>
        </ul>
        <div v-else>无内容</div>
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="20"
            :total="100"
            :current-page.sync="page"
            @current-change="changePage"
          >
          </el-pagination>
        </div>
      </template>
    </Container>
  </div>
  <!-- <NotFound text="无标题" v-else /> -->
</template>

<script>
import NotFound from "../views/NotFound";
import Container from "../layout/Container";
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      page: 1,
      loading: true,
    };
  },
  components: {
    Container,
    // NotFound,
  },
  // 对于文章的类型做格式化，制作一个小按钮，filters 是个对象，可以定义全局的，也可以定义组件内的，有个名字，函数，接收个参数，然后返回一个内容就行
  // 传当前文章的对象进来，
  // {{ 参数 | 函数(过滤器) }}  {{ item | formatType }}
  filters: {
    formatType(arrText) {
      return arrText.top
        ? "置顶"
        : arrText.good
        ? "精华"
        : arrText.tab === "share"
        ? "分享"
        : arrText.tab === "ask"
        ? "问答"
        : "招聘";
    },
  },
  created() {
    const  lo  = this.$route;
    console.log(lo);
    // console.log(lo.tab);
    // const { tab } = this.$route.query;
    // console.log(tab);
    // console.log(this.$route.query);
    // this.getText(tab);
    // this.$store.dispatch("getText");
  },
  watch: {
    "$route.query": {
      async handler(newValue, oldValue) {
        //第二种发请求数据的方法 this.$store.dispatch("getText", tab);
        // 1. 拿到地址栏页面修改的信息 tab   page
        const { tab, page } = newValue;
        this.loading = true;
        // 先判断一下是不是刚进入到首页的时候，因为那时候是没有 page 的，没有的话就默认显示第一页数据
        if (!page) {
          this.page = 1;
        }
        await this.getText({ tab, page: page || 1 });
        this.loading = false;
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["getText"]),
    changePage(pageNum) {
      // this.getText({ tab: this.$route.query.tab, page: pageNum });
      // 修改地址栏
      const query = this.$route.query; //先过去地址栏信息
      const tab = query.tab ? query.tab : "all"; // 如果地址栏为空的话就等于 all
      // 现在就开始点击按钮的时候做修改
      this.$router.push(`/?tab=${tab}&page=${pageNum}`);
    },
  },
  computed: {
    ...mapState(["arrText", "topic"]),
    last() {
      return (item) => {
        return this.$moment(item).fromNow();
      };
    },
  },
};
</script>

<style lang="stylus">
.tabs
  display flex
  a
    background-color #fff
    text-decoration: none;
    color #000
    padding 6px
    margin-left 30px
    border-radius 5px
    color #369219
    flex-shrink 0
  .router-link-active
    background-color: #369219;
    color #fff
  .active
    background-color: #369219;
    color #fff
.list
  list-style none
  padding-left 0
  margin 0
  .item
    line-height 60px
    padding 0 20px
    border-bottom 1px solid #ccc
    display flex
    align-items center
    justify-content flex-start
  .item:last-child
    border-bottom: none
  li:hover
    background-color: #f6f6f6;
  .type
    font-size 14px
    color #888
    padding 3px
    line-height 16px
    background-color #e5e5e5
    margin-right 10px
    border-radius 3px
    flex-shrink 0
  .top ,.good
    background-color #369219
    color #fff
  .ask
      border 1px solid red
      color red
      background-color: #fff;
  .Time
    color #555
    font-size 12px
    align-self center
    flex-shrink 0
  .item_title
    flex-grow 1
    overflow hidden //溢出隐藏
    text-overflow ellipsis  //溢出显示标点符号
    white-space nowrap  //不让换行
    margin-right 60px
    a
      color #333
      text-decoration none
    a:hover
      text-decoration underline
.paging
  margin-top 10px
  .number 
    background-color: red;
    color: #778087;
</style>