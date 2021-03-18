<template>
  <div>
    <Container>
      <template #head>
        <router-link class="Home" to="/">主页</router-link>
        <span class="i">/</span>
        <span class="MoreTopic_Home">
          <!-- <router-link :to="`/topic/${User.recent_topics.id}`">{{ User.loginname }}的主页</router-link> -->
        </span>
      </template>
    </Container>
    <Container>
      <template #head>
        <!-- <span class="MoreTopic_name">{{ User.loginname }} 创建的话题</span> -->
      </template>
      <template #main>
        <ul>
          <li
            class="MoreTopic_cell"
            v-for="item in showRecent_topics"
            :key="item.id"
          >
            <span class="MoreTopic_title">
              <router-link :to="`/topic/${item.id}`">
                <a href="#">{{ item.title }}</a>
              </router-link>
            </span>
          </li>
        </ul>
        <el-pagination
          v-if="recent_topics.length > 20"
          background
          layout="prev, pager, next"
          :page-size="20"
          :current-page="currentPage"
          :total="recent_topics.length"
          @current-change="changePage"
        >
        </el-pagination>
      </template>
    </Container>
  </div>
  <!-- <NotFound text="用户不存在" v-else /> -->
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Container from "../layout/Container";
// import NotFound from "../views/NotFound";
export default {
  name: "MoreTopics1",
  data() {
    return {
      currentPage: 1,
    };
  },
  components: {
    Container,
    // NotFound,
  },
  created() {
    // console.log(this.$store.state.User); //原对象没有变
    // 看 store 中 User 是否存在
    if (!this.User) {
      const User_Id = this.$route.params.User_Id;
      console.log(User_Id);
      this.getUser(User_Id);
    }
  },
  computed: {
    ...mapState(["User"]),
    ...mapGetters(["recent_topics"]),
    showRecent_topics() {
      const { currentPage, recent_topics } = this;
      // console.log(currentPage);
      return recent_topics.length > 20
        ? recent_topics.slice(
            (currentPage - 1) * 20,
            (currentPage - 1) * 20 + 20
          )
        : recent_topics;
    },
  },
  methods: {
    ...mapActions(["getUser"]),
    changePage(PageNmae) {
      this.currentPage = PageNmae;
    },
  },
};
</script>

<style lang="stylus">
.MoreTopic_name
  font-size 14px
  color #333
.MoreTopic_cell
  overflow hidden
  padding 18px 10px
  border-bottom 1px solid #ccc
  display flex
  justify-content space-between
.MoreTopic_cell:hover
  background-color #f3f3f3
.MoreTopic_title
  flex-grow 1
  color #ccc
  a
    color #08c
  a:hover
    text-decoration underline
    color #005580
</style>
