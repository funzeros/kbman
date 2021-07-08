<template>
  <div class="game-main">
    <div>
      <Map />
    </div>
    <div></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Map from "./Map.vue";
export default defineComponent({
  components: { Map },
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
