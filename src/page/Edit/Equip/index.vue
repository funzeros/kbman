<template>
  <div class="edit-equip-wrap">
    <IconWeapon :value="weapon" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import IconWeapon from "./IconWeapon.vue";
import useEquip from "/@/hooks/useEquip";
export default defineComponent({
  components: {
    IconWeapon
  },
  setup() {
    const { build } = useEquip();
    const weapon = build.weapon(1);
    return { weapon };
  }
});
</script>
<style lang="scss" scoped>
.edit-equip-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
