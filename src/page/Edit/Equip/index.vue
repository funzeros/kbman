<template>
  <div class="edit-equip-wrap">
    <g-equip-icon :value="weapon" />
    <g-equip-icon :value="shield" />
    <g-equip-icon :value="lorica" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useEquip from "/@/hooks/useEquip";
export default defineComponent({
  setup() {
    const { build } = useEquip();
    const weapon = build.weapon(60);
    const shield = build.shield(60);
    const lorica = build.lorica(60);
    return { weapon, shield, lorica };
  }
});
</script>
<style lang="scss" scoped>
.edit-equip-wrap {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}
</style>
