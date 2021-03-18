<template>
  <div>
    <Container>
      <template #head>
        <span>最新创建的话题</span>
      </template>
      <template #main v-if="User">
        <ul v-if="User.recent_topics.length">
          <li class="cell" v-for="item in User.recent_topics" :key="item.id">
            <span class="topic_title">
              <router-link :to="`/topic/${item.id}`">
                <a href="#">{{ item.title }}</a>
              </router-link>
            </span>
            <img :src="User.avatar_url" alt="" />
          </li>
        </ul>
      </template>
    </Container>
  </div>
</template>

<script>
import Container from "../layout/Container";
import { mapActions, mapState } from "vuex";
export default {
  name: "MoreTopics",
  components: {
    Container,
  },
  created() {
    const User_Id = this.$route.params.User_Id;
    console.log(User_Id);
    this.getUser(User_Id);
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    ...mapActions(["getUser"]),
  },
  watch: {
    "$route.params.User_Id": {
      handler(newValue, oldValue) {
        if (newValue === "Eli-v12") {
          this.getUser(newValue);
        } else {
          this.getUser(newValue);
        }
      },
    },
  },
};
</script>

<style lang="stylus">
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
</style>
