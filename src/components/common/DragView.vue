<template>
  <teleport to="body">
    <div
      class="mask-model drag-view event-none"
      v-show="dialogShow"
      @mousedown="zIndexMax($event, 'drag-view')"
    >
      <div
        class="content"
        :class="[position]"
        :style="{ transform: `translate(${xy.x}px, ${xy.y}px)` }"
      >
        <div class="top-bar" @mousedown="handleMD($event)">
          <span> {{ title }} </span>
          <i class="icon-btn el-icon-close" @click.stop="close()"></i>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
import { zIndexMax } from "/@/utils/dom";
export default defineComponent({
  name: "GDragView",
  props: {
    title: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: "right"
    }
  },
  setup() {
    class ModelData {
      dialogShow = false;
      xy: XY = {
        x: 0,
        y: 0
      };

      canDrag = false;
    }
    class ConstData {
      pageXY: XY = {
        x: 0,
        y: 0
      };
      baseXY: XY = {
        x: 0,
        y: 0
      };
    }
    const modelData = reactive<ModelData>(new ModelData());
    const constData = new ConstData();
    const methods = {
      zIndexMax,
      open() {
        modelData.dialogShow = true;
      },
      close() {
        modelData.dialogShow = false;
      },
      reverse() {
        modelData.dialogShow = !modelData.dialogShow;
      },
      handleMD(e: MouseEvent) {
        constData.pageXY.x = e.pageX;
        constData.pageXY.y = e.pageY;
        modelData.canDrag = true;
      },
      handleMU() {
        if (modelData.canDrag) {
          modelData.canDrag = false;
          constData.baseXY.x = modelData.xy.x;
          constData.baseXY.y = modelData.xy.y;
        }
      },
      handleMV(e: MouseEvent) {
        if (!modelData.canDrag) return;
        modelData.xy.x = constData.baseXY.x + e.pageX - constData.pageXY.x;
        modelData.xy.y = constData.baseXY.y + e.pageY - constData.pageXY.y;
      }
    };
    onMounted(() => {
      document.body.addEventListener("mouseup", methods.handleMU);
      document.body.addEventListener("mousemove", methods.handleMV);
    });
    onUnmounted(() => {
      document.body.removeEventListener("mouseup", methods.handleMU);
      document.body.addEventListener("mousemove", methods.handleMV);
    });
    return {
      ...toRefs(modelData),
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.content {
  position: absolute;
  width: 400px;
  height: 600px;
  background: #000;
  border: 4px solid $--color-white;
  top: 50px;
  &.left {
    right: calc(50vw + 50px);
  }
  &.right {
    left: calc(50vw + 50px);
  }
  .top-bar {
    width: 100%;
    background: #333;
    height: 36px;
    line-height: 36px;
    text-align: center;
    box-sizing: content-box;
    border-bottom: 4px solid $--color-white;
    cursor: pointer;
  }
  .icon-btn {
    float: right;
    font-size: 20px;
    line-height: 30px;
    padding: 0 5px;
    margin: 3px 3px 0 0;
    border: 1px solid $--color-white;
    &:hover {
      box-shadow: 0 0 10px 0 $--color-white inset;
    }
    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
