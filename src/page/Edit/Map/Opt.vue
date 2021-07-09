<template>
  <div>
    <div class="list g-basic-scroll">
      <div
        class="item"
        v-for="(item, i) of mapList"
        :key="i"
        @click.left="handleChose(i)"
        @click.right="handleDel(i, $event)"
      >
        <div>type：{{ item.type }}</div>
        <div>x：{{ item.x }}</div>
        <div>y：{{ item.y }}</div>
        <div>width：{{ item.width }}</div>
        <div>height：{{ item.height }}</div>
        <div>radius：{{ item.radius }}</div>
        <div>color：{{ item.color }}</div>
      </div>
    </div>
    <el-form :model="modelRef" label-width="60px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="类型">
            <el-select v-model="modelRef.type">
              <el-option
                v-for="item of Object.keys(mapBlockType)"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="x">
            <el-input-number v-model="modelRef.x"></el-input-number>
          </el-form-item>
          <el-form-item label="y">
            <el-input-number v-model="modelRef.y"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleCreate()">创建</el-button>
            <el-button @click="handleUpdate()">更新</el-button>
            <el-button @click="handleExport()">导出</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="width">
            <el-input-number v-model="modelRef.width"></el-input-number>
          </el-form-item>
          <el-form-item label="height">
            <el-input-number v-model="modelRef.height"></el-input-number>
          </el-form-item>
          <el-form-item label="color">
            <el-input-number v-model="modelRef.color"></el-input-number>
            <span
              :style="{
                display: 'inline-block',
                height: '100%',
                width: '80px',
                background: `#${modelRef.color.toString(16)}`
              }"
              >{{ modelRef.color.toString(16) }}</span
            >
          </el-form-item>
          <el-form-item label="color">
            <el-color-picker
              v-model="color"
              @change="handleChangeColor"
            ></el-color-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import { cloneDeep } from "lodash";
import { defineComponent, ref } from "vue";
import { MapBlockDTO, mapBlockType } from "/@/types/Map/dto";
import { mergeProperties } from "/@/utils/common";
export default defineComponent({
  props: {
    mapList: {
      type: Array as PropType<MapBlockVO[]>,
      required: true
    }
  },
  emits: ["addBlock", "delBlock", "updateBlock"],
  setup(props, ctx) {
    const modelRef = ref(new MapBlockDTO());
    const index = ref(0);
    const color = ref("#aaaaaa");
    const methods = {
      handleCreate() {
        ctx.emit("addBlock", modelRef.value);
      },
      handleUpdate() {
        ctx.emit("updateBlock", modelRef.value, index.value);
      },
      handleChose(i: number) {
        index.value = i;
        modelRef.value = mergeProperties(new MapBlockDTO(), props.mapList[i]);
      },
      handleDel(i: number, e: MouseEvent) {
        ctx.emit("delBlock", i);
        e.preventDefault();
      },
      handleExport() {
        const blob = new Blob(
          [
            JSON.stringify({
              name: "地图",
              list: cloneDeep(props.mapList).reverse()
            })
          ],
          {
            type: "application/json"
          }
        );
        const el = document.createElement("a");
        el.download = "map.json";
        el.href = URL.createObjectURL(blob);
        el.click();
      },
      handleChangeColor(color: string) {
        modelRef.value.color = Number(`0x${color.substring(1)}`);
      }
    };
    return { color, modelRef, mapBlockType, index, ...methods };
  }
});
</script>
<style lang="scss" scoped>
.list {
  white-space: nowrap;
  width: calc(100vw - 40px);
  overflow-x: scroll;
  padding-bottom: 10px;
  .item {
    display: inline-block;
    border: 1px solid #fff;
    padding: 5px;
    cursor: pointer;
    &:not(:first-of-type) {
      margin-left: 10px;
    }
    &:hover {
      background-color: #333;
    }
  }
}
</style>
