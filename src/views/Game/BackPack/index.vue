<template>
  <g-drag-view title="物品栏" ref="GDVRef">
    <div class="back-pack">
      <div class="equip">
        <g-equip-icon
          :class="item.name"
          :style="{
            ['grid-area']: item['grid-area'],
            transform: item.transform
          }"
          v-for="item of equipReanderList"
          :key="item"
          :type="item.type"
          :value="dressedEquips[item.type]"
        />
      </div>
      <div class="pack"></div>
    </div>
  </g-drag-view>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "/@/store";
import { equipReanderList } from "./options";
export default defineComponent({
  setup() {
    const GDVRef = ref();
    const store = useStore();
    const dressedEquips = computed(() => store.getters.dressedEquips);
    const methods = {
      reverse() {
        GDVRef.value.reverse();
      }
    };
    return { GDVRef, ...methods, dressedEquips, equipReanderList };
  }
});
</script>
<style lang="scss" scoped>
.back-pack {
  padding: 12px;
  .equip {
    height: 160px;
    display: grid;
    grid-template-columns: 40px 40px 1fr 40px 40px;
    grid-template-rows: repeat(3, 40px);
    gap: 10px;
  }
  .pack {
    width: 100%;
    height: 370px;
    box-shadow: 0 0 0 1px #fff inset;
  }
}
</style>
