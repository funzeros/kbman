<template>
  <div class="game-main">
    <div class="map"><Map /></div>
    <div class="opt"><Opt /></div>
    <Battle ref="BattleRef" />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide, ref } from "vue";
import Map from "./Map.vue";
import Opt from "./Opt.vue";
import Battle from "../Battle/index.vue";
export default defineComponent({
  components: { Map, Opt, Battle },
  setup() {
    const BattleRef = ref();
    const methods = {
      handleStartBattle() {
        BattleRef.value.open();
      }
    };
    provide("startBattle", methods.handleStartBattle);

    return {
      BattleRef,
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.game-main {
  --opt-height: 250px;
  .map {
    padding: 30px 20px 10px;
  }
  .opt {
    padding: 10px 20px 30px;
  }
  .map {
    height: calc(100vh - var(--opt-height));
  }
  .opt {
    height: var(--opt-height);
  }
}
</style>
