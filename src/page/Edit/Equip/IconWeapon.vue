<template>
  <div class="weapon-box">
    <div class="assem rotate-z-r">
      <div
        class="scabbard"
        v-if="partData.scabbard"
        :style="partData.scabbard && partData.scabbard.data.style"
      ></div>
    </div>
    <div class="assem">
      <div
        class="body edge"
        :style="[
          partData.body.data.style,
          partData.edge && partData.edge.data.style
        ]"
      >
        <div
          class="tsuba"
          v-if="partData.tsuba"
          :style="partData.tsuba && partData.tsuba.data.style"
        ></div>
      </div>
      <div class="case" :style="partData.case.data.style"></div>
      <div class="stalk" :style="partData.stalk.data.style"></div>
      <div
        class="head"
        v-if="partData.head"
        :style="partData.head && partData.head.data.style"
      ></div>
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
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotateZ(-45deg);
}
.rotate-z-r {
  transform: rotateZ(-135deg);
}
.body {
  position: relative;
}
.tsuba {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
