<template>
  <div class="game-main">
    <div><Map /></div>
    <div><Opt /></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Map from "./Map.vue";
import Opt from "./Opt.vue";
export default defineComponent({
  components: { Map, Opt },
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
.game-main {
  height: 100%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  & > div {
    padding: 20px;
  }
}
</style>
