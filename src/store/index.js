import Vue from "vue";
import Vuex from "vuex";
import $axios from "../plugins/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    arrText: null,
    topic: null,
    UserInfo: null,
    User: null,
  },
  mutations: {
    getText(state, arrText) {
      state.arrText = arrText;
    },
    getTopic(state, topic) {
      state.topic = topic;
    },
    getUserInfo(state, UserInfo) {
      state.UserInfo = UserInfo;
    },
    getUser(state, User) {
      state.User = User;
    },
  },
  actions: {
    // getText
    async getText({ commit }, { tab, page }) {
      commit("getText", null);
      // const queryStr = tab && tab !== "all" ? `?tab=${tab}` : "";
      const queryStr =
        tab && tab !== "all"
          ? `?tab=${tab}&page=${page}&limit=20`
          : `?tab=all&page=${page}&limit=20`;

      // 刚刚漏掉了一点加上了 ?${queryStr}  知识点：js语法 字符串拼接
      const Text = await $axios.get(`/topics/${queryStr}`);
      //   /api/topics 发的请求
      // 由于你的服务器做了代理 ，将 /api 代理到了 https://vue-js.com/api/v1
      // 最终的请求 https://vue-js.com/api/v1/topics
      // console.log(Text.data);
      // console.log(Text.data[0].last_reply_at);
      commit("getText", Text.data);
    },

    // 不加 async 以及 await
    // async getText({ commit }, { tab, page }) {
    // getText({ commit }, { tab, page }) {
    //   return new Promise(resolve =>{
    //   commit("getText", null);
    //   const queryStr =
    //     tab && tab !== "all"
    //       ? `?tab=${tab}&page=${page}&limit=20`
    //       : `?tab=all&page=${page}&limit=20`;
    //   // const Text = await $axios.get(`/topics/${queryStr}`);
    //       $axios.get(`/topics/${queryStr}`).then((res)=>{
    //         commit("getText", res.data);
    //         resolve()
    //       })
    //   })
    // },

    // getTopics
    async getTopic({ commit }, id) {
      commit("getTopic", null); //点击新的文章老的文章会出现，每次请求之前先清空在请求
      // 1201
      const token = sessionStorage.getItem("Tokenkey");
      const queryObj = token ? { params: { accesstoken: token } } : {};

      const res = await $axios.get(`/topic/${id}`, queryObj);
      // 被上面覆盖
      // const res = await $axios.get(`/topic/${id}`, {
      //   params: { accesstoken: "43334838-16f5-4c33-a5e3-3c65f055ed15" },
      // });
      // console.log(res.data);
      commit("getTopic", res.data);
    },

    //  getUserInfo 请求登录
    async getUserInfo({ commit }, token) {
      if (token === "43334838-16f5-4c33-a5e3-3c65f055ed15") {
        sessionStorage.setItem("Tokenkey", token);
        const Token = await $axios.get("/user/Eli-v12");
        // console.log(Token);
        commit("getUserInfo", Token.data);
      } else {
        alert("请输入正确 Token");
      }
    },
    //  getUser 请求 id 个人信息
    async getUser({ commit }, User_Id) {
      // console.log(User_Id);
      const UserID = await $axios.get(`/user/${User_Id}`);
      // console.log(UserID);
      commit("getUser", UserID.data);
    },
  },
  // store 的计算属性 getters
  getters: {
    // 对 User 进行计算
    recent_topics(state) {
      const { User } = state;
      // console.log(User); // {…} 全部的数据
      // console.log(getters); //recent_topics: Array(86)
      return User ? User.recent_topics : [];
    },
  },
  modules: {},
});
