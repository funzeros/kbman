<template>
  <div class="game-main">
    <div class="map"><Map /></div>
    <div class="opt"><Opt /></div>
    <Suspense>
      <template #default>
        <Battle ref="BattleRef" />
      </template>
    </Suspense>
    <Suspense>
      <template #default>
        <AttrPanel ref="AttrPanelRef" />
      </template>
    </Suspense>
    <Suspense>
      <template #default>
        <BackPack ref="BackPackRef" />
      </template>
    </Suspense>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide, Ref, ref } from "vue";
import Map from "./Map.vue";
import Opt from "./Opt.vue";
import Battle from "../Battle/index.vue";
import BackPack from "../BackPack/index.vue";
import AttrPanel from "../AttrPanel/index.vue";
export default defineComponent({
  components: {
    Map,
    Opt,
    Battle,
    BackPack,
    AttrPanel
  },
  setup() {
    const refs: GObj<Ref> = {
      BattleRef: ref(),
      BackPackRef: ref(),
      AttrPanelRef: ref()
    };
    const methods = {
      exeReverse(refName: string) {
        refs[refName].value.reverse();
      }
    };
    provide("exeReverse", methods.exeReverse);

    return {
      ...refs,
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
