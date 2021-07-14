<template>
  <div class="kb-wrap">
    <div
      :class="[item.name, item.keyCode in keyPool ? 'active' : '']"
      :data-name="item.name"
      v-for="item of btnList"
      :key="item.name"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
export default defineComponent({
  setup() {
    const btnList = [
      {
        name: "w",
        keyCode: 87
      },
      {
        name: "a",
        keyCode: 65
      },
      {
        name: "s",
        keyCode: 83
      },
      {
        name: "d",
        keyCode: 68
      },
      {
        name: "enter",
        keyCode: 13
      },
      {
        name: "space",
        keyCode: 32
      }
    ];
    const effectKeys = btnList.map(({ keyCode }) => keyCode);
    const keyPool = ref<GObj>({});
    const handleKD = (e: KeyboardEvent) => {
      if (window.isInput) return;
      if (!effectKeys.includes(e.keyCode)) return;
      keyPool.value[e.keyCode] = true;
    };
    const handleKU = (e: KeyboardEvent) => {
      if (!effectKeys.includes(e.keyCode)) return;
      delete keyPool.value[e.keyCode];
    };
    onMounted(() => {
      document.body.addEventListener("keydown", handleKD);
      document.body.addEventListener("keyup", handleKU);
    });
    onUnmounted(() => {
      document.body.removeEventListener("keydown", handleKD);
      document.body.removeEventListener("keyup", handleKU);
    });
    return { btnList, keyPool };
  }
});
</script>
<style lang="scss" scoped>
.kb-wrap {
  display: grid;
  grid-template-columns: repeat(4, 50px);
  grid-template-rows: repeat(3, 50px);
  gap: 10px;
  align-content: center;
  & > div {
    height: 100%;
    background-color: $--color-blue;
    text-align: center;
    line-height: 50px;
    user-select: none;
    border-radius: $--border-radius-base;
    box-shadow: 2px 2px 4px 0 #fff;
    &::after {
      content: attr(data-name);
    }
    &.active {
      background-color: $--color-orange;
      box-shadow: 2px 2px 4px 0 #fff, 2px 2px 10px 4px $--color-orange;
    }
    &.disabled {
      background-color: $--color-text-regular;
    }
  }
  .w {
    grid-area: 1 / 2 / 2 / 3;
  }
  .a {
    grid-area: 2 / 1 / 3 / 2;
  }
  .s {
    grid-area: 2 / 2 / 3 / 3;
  }
  .d {
    grid-area: 2 / 3 / 3 / 4;
  }
  .enter {
    grid-area: 2 / 4 / 4 / 5;
    line-height: 110px;
  }
  .space {
    grid-area: 3 / 1 / 4 / 4;
  }
}
</style>
