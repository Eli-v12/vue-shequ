<template>
  <header>
    <router-link to="/">
      <img src="https://vue-js.com/public/images/vue.png" alt="" />
    </router-link>
    <div v-if="!UserInfo" class="login-box">
      <el-input v-model="token" placeholder="请输入 token"></el-input>
      <el-button class="inp" size="mini" @click="login">登录</el-button>
    </div>
    <div v-else class="logout">
      <router-link to="/user/Eli-v12">
        <img :src="UserInfo.avatar_url" alt="" />
      </router-link>
      <el-button size="mini" @click="removeKey">退出</el-button>
    </div>
    <router-link class="messages" to="/my/messages">未读消息</router-link>
  </header>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      token: "43334838-16f5-4c33-a5e3-3c65f055ed15",
    };
  },
  created() {
    const Tokenkey = sessionStorage.getItem("Tokenkey");
    if (Tokenkey) {
      this.getUserInfo(Tokenkey);
    }
  },
  computed: {
    ...mapState(["UserInfo"]),
    ...mapState(["Tokenkey"]),
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    async login() {
      const { token } = this;
      // const token = this.token
      if (token.trim()) {
        await this.getUserInfo(token);
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
      }
    },
    removeKey() {
      this.$store.commit("getUserInfo", null);
      sessionStorage.removeItem("Tokenkey");
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>
<style lang="stylus">
// 加了 scoped 只能修改外面的盒子，里面的修改不了
header
  // width 100%
  display flex
  background: red linear-gradient(to right, #CCFBFF,#EF96C5, #CCFBFF,#C973FF,#F2BAE8, #CCFBFF,#EF96C8,#AEBAF8);
  align-items center
  justify-content:center
  img 
    display flex
    width 50px
    height 50px
    line-height 30px
  .login-box,.logout
    display flex
    justify-content:space-around
    margin-left 50px
    align-items center
    .inp
      margin-left 30px
  .logout
    width 200px
    img
      cursor pointer
</style>
