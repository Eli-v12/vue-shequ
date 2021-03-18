<template>
  <!-- 布局的容器组件 -->
  <div class="container">
    <!-- <div v-if="$slots.head" class="container-header"> -->
    <div class="container-header">
      <slot name="head"></slot>
    </div>
    <div class="container-cantent">
      <slot name="main"></slot>
    </div>
    <div class="container-section">
      <slot name="section"></slot>
    </div>
  </div>
</template>

<style lang="stylus">
.container
  width 90%
  border-radius 5px
  border 1px solid #ccc
  margin 30px auto
  background-color: #fff;
  .container-header
    background-color #f6f6f6
    padding:10px
  .container-cantent
    background-color #fff
    padding 10px 20px
  .container-section
    background-color #fff
</style>
