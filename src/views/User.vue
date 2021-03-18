<template>
  <!-- <div v-if="!User">请稍等</div> -->
  <div v-if="User">
    <Container>
      <template #head>
        <router-link class="Home" to="/">主页</router-link>
        <span class="i">/</span>
      </template>
      <template #main v-if="User">
        <div class="userinfo">
          <div class="userinfo-top">
            <img :src="User.avatar_url" alt="" />
            <span>{{ User.loginname }}</span>
          </div>
          <ul>
            <li class="integral">{{ User.score }} 积分</li>
            <li class="Collection">
              <a href="#">{{ User.recent_topics.length }}个话题收藏</a>
            </li>
            <li class="dark">
              <span></span><a href="#">@{{ User.githubUsername }}</a>
            </li>
          </ul>
          <p>注册时间 {{ last(User.create_at) }}</p>
        </div>
      </template>
    </Container>
    <Container>
      <template #head>
        <span>最新创建的话题</span>
      </template>
      <template #main v-if="User">
        <ul v-if="User.recent_topics.length">
          <li class="cell" v-for="item in showCreateTopics" :key="item.id">
            <span class="topic_title">
              <router-link :to="`/topic/${item.id}`">
                <a href="#">{{ item.title }}</a>
              </router-link>
            </span>
            <img :src="User.avatar_url" alt="" />
            <span class="topic_data">
              <a href="#">{{ last(item.last_reply_at) }}</a>
            </span>
          </li>
          <li class="cell see">
            <!-- 两种方法 -->
            <!-- <router-link :to="{ name: 'MoreTopics1' }">查看更多>></router-link> -->
            <router-link :to="`/User/${User.loginname}/topics`"
              >查看更多>></router-link
            >
          </li>
        </ul>
      </template>
    </Container>
  </div>
  <NotFound text="用户不存在" v-else />
</template>

<script>
import Container from "../layout/Container";
import NotFound from "../views/NotFound";
import { mapActions, mapState } from "vuex";
export default {
  name: "User",
  components: {
    Container,
    NotFound,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    const User_Id = this.$route.params.User_Id;
    console.log("页面刷新，进入到个人信息页面", "id 是:", User_Id);
    // this.getUser(User_Id);
  },
  computed: {
    ...mapState(["User"]),
    last() {
      return (item) => {
        return this.$moment(item).fromNow();
      };
    },
    showCreateTopics() {
      const topics = this.User.recent_topics;
      return topics.length > 4 ? topics.slice(0, 4) : topics;
    },
  },
  methods: {
    ...mapActions(["getUser"]),
    // loading() {
    //   this.isLoading = true;
    //   setTimeout(() => {
    //     this.isLoading = false;
    //   }, 2000);
    // },
  },
  watch: {
    "$route.params.User_Id": {
      handler(newValue, oldValue) {
        // 这个是我自己之前做的方法
        // if (newValue === "Eli-v12") {
        //   this.getUser(newValue);
        // } else {
        //   this.getUser(newValue);
        // }
        // 这个是正确的方法
        this.getUser(newValue);
        console.log("当前 id 是:", newValue);
      },
      immediate: true,
    },
  },
};
</script>
<style lang="stylus">
.Home
  color green
  margin-right 10px
  text-decoration none
  font-size 16px
.Home:hover
  text-decoration underline
.i
  color #ccc
.userinfo
  .userinfo-top
    display flex
    align-items center   
    img
      width 50px
      height 50px
      margin-right 10px
      border-radius 4px
    span
      color #888
  ul
    margin-top 10px
    li
      padding-bottom 10px
    .integral
      color #333
    .Collection
      a
        font-size 16px
        color #888
    .dark
      a
        color #888
  p
    color #888
.cell
  overflow hidden
  padding 18px 10px
  border-bottom 1px solid #ccc
  display flex
  justify-content space-between
  .topic_title
    flex-grow 1
    a
      color #08c
    a:hover
      text-decoration underline
      color #005580
  img
    width 20px
    height 20px
    // margin-right 10px
  .topic_data
    width 64px
    display flex
    display: flex;
    justify-content flex-end
    // flex-direction row-reverse
    a
      font-size 14px
      color #777
    a:hover
      color #005580
.see
  a
    color #555
  a:hover
    color #005580
</style>

