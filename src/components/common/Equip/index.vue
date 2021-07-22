<template>
  <div class="equip-wrap">
    <component
      v-if="value && value.type"
      :is="nameMap[value.type]"
      :value="value"
    />
    <i v-else :class="defaultMap[type] || 'el-icon-lock'"></i>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import IconWeapon from "./IconWeapon.vue";
import IconShield from "./IconShield.vue";
import IconLorica from "./IconLorica.vue";
export default defineComponent({
  name: "GEquipIcon",
  components: {
    IconWeapon,
    IconShield,
    IconLorica
  },
  props: {
    value: {
      type: Object as PropType<EquipVO>,
      default: () => void 0
    },
    type: {
      type: String as PropType<EquipType>,
      default: ""
    }
  },
  setup() {
    const nameMap: EquipComponentMap = {
      weapon: "IconWeapon",
      shield: "IconShield",
      lorica: "IconLorica"
    };
    const defaultMap: EquipComponentMap = {
      weapon: "icon-kbmanCrossingSwords",
      shield: "icon-kbmanShieldAndArmor",
      lorica: "icon-kbmanProtectiveWear"
    };
    return { nameMap, defaultMap };
  }
});
</script>
<style lang="scss" scoped>
.equip-wrap {
  height: 40px;
  width: 40px;
  box-shadow: 0 0 0 1px $--color-white;
  background-color: #000;
  text-align: center;
}
i {
  font-size: 30px;
  line-height: 40px;
  color: $--color-text-regular;
}
</style>
