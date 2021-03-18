<template>
  <div><Header /><router-view></router-view></div>
</template>

<script>
import Header from "./components/Header";
// import axios from "axios";
export default {
  name: "App",
  components: {
    Header,
  },
  created() {
    // const {l} = location.search;
    // console.log(location);
    // console.log(location.pathname);
    // console.log(this.$route);
    // console.log(this.$route.query);
  },
  // created() {
  // this.$store.dispatch("getText");
  //   console.log(axios);
  //   axios
  //     .get("https://vue-js.org/api/v1/topics?page=1&limit=20")
  //     .then((res) => {
  //       this.tableData = res.data.data;
  //     });
  //   console.log(this.tableData);
  // },
};
</script>

<style

</style>
