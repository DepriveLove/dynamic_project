<template>
  <div class="content" @click="handleClick($event,11)"></div>
</template>

<script lang="js" setup>
const handleClick = (e,number) => {
  console.log(e)
  console.log(e.target.className)
}
</script>

<style scoped lang="scss">

.content {
  width: 0;
  height: 0;
  border: 100px solid transparent;
  border-top: 100px solid red;
  //border-right: 100px solid green;
  //border-bottom: 100px solid blue;
  //border-left: 100px solid yellow;
}
</style>
