<template>
  <div>
    Testing PIXI
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';

export default {
  mounted() {
    console.log('hello from testPixi');
    console.log(PIXI);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
