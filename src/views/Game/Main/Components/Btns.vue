<template>
  <div class="btn-list">
    <div
      class="btn"
      v-for="item of btnList"
      :key="item.prop"
      :title="item.name"
      @click="item.func()"
    >
      <face-icon :value="item.icon" size="50px"></face-icon>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import useEquip from "/@/hooks/useEquip";
export default defineComponent({
  setup() {
    const startBattle = inject("startBattle") as Fn;
    const { build } = useEquip();
    const btnList = computed(() => {
      return [
        {
          prop: "character",
          name: "角色",
          icon: "icon-Character",
          func: () => {
            //
            const weapon = build.weapon(1);
            console.log(weapon);
          }
        },
        {
          prop: "backpack",
          name: "物品",
          icon: "icon-Treasure",
          func: () => {
            //
          }
        },
        {
          prop: "battle",
          name: "战斗",
          icon: "icon-RPGGame",
          func: () => {
            startBattle();
          }
        }
      ];
    });
    return { btnList };
  }
});
</script>
<style lang="scss" scoped>
$--btn-bh-color: rgb(4, 172, 247);
.btn-list {
  display: grid;
  grid-template-columns: repeat(4, 50px);
  grid-template-rows: repeat(3, 50px);
  gap: 20px 10px;
  .btn {
    height: 100%;
    width: 100%;
    cursor: pointer;
    position: relative;
    &:hover {
      box-shadow: 0 0 1px 0 $--btn-bh-color inset;
      background: linear-gradient(to left, $--btn-bh-color, $--btn-bh-color)
          left top no-repeat,
        linear-gradient(to bottom, $--btn-bh-color, $--btn-bh-color) left top
          no-repeat,
        linear-gradient(to left, $--btn-bh-color, $--btn-bh-color) right top
          no-repeat,
        linear-gradient(to bottom, $--btn-bh-color, $--btn-bh-color) right top
          no-repeat,
        linear-gradient(to left, $--btn-bh-color, $--btn-bh-color) left bottom
          no-repeat,
        linear-gradient(to bottom, $--btn-bh-color, $--btn-bh-color) left bottom
          no-repeat,
        linear-gradient(to left, $--btn-bh-color, $--btn-bh-color) right bottom
          no-repeat,
        linear-gradient(to left, $--btn-bh-color, $--btn-bh-color) right bottom
          no-repeat;
      background-size: 2px 10px, 10px 2px, 2px 10px, 10px 2px, 2px 10px,
        10px 2px, 2px 10px, 10px 2px;
    }
    &:active {
      background-color: $--btn-bh-color;
      border-radius: $--border-radius-base;
    }
    &::before {
      width: 100%;
      content: attr(title);
      position: absolute;
      left: 0;
      bottom: -16px;
      font-size: 12px;
      line-height: 16px;
      pointer-events: none;
      text-align: center;
    }
  }
}
</style>
