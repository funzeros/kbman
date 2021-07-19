<template>
  <div class="weapon-box">
    <div class="assem">
      <div class="hold" :style="partData.hold.data.style"></div>
    </div>
    <div class="assem">
      <div class="face" :style="partData.face.data.style">
        <div class="emblem" :style="partData.emblem.data.style"></div>
        <div
          class="sharp"
          v-if="partData.sharp"
          :style="partData.sharp && partData.sharp.data.style"
        ></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: {
    value: {
      type: Object as PropType<EquipVO>,
      required: true
    }
  },
  setup(props) {
    console.log(props.value);
    const partData = computed(() => {
      return props.value.partData;
    });
    return { partData };
  }
});
</script>
<style lang="scss" scoped>
.weapon-box {
  height: 100px;
  width: 100px;
  box-shadow: 0 0 0 2px #fff;
  background-color: #000;
  position: relative;
}
.assem {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
