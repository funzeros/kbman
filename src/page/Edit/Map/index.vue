<template>
  <div class="edit-main">
    <div>
      <Map :mapList="mapList" ref="mapRef" />
    </div>
    <div>
      <Opt
        :mapList="mapList"
        @addBlock="addBlock"
        @delBlock="delBlock"
        @updateBlock="updateBlock"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapBlockList } from "/@/const/map";
import Map from "./Map.vue";
import Opt from "./Opt.vue";
import { cloneDeep } from "lodash";
import { MapBlockDTO } from "/@/types/Map/dto";
export default defineComponent({
  components: { Map, Opt },
  setup() {
    const mapRef = ref();
    const mapList = ref(cloneDeep(mapBlockList).reverse());
    const methods = {
      addBlock(row: MapBlockDTO) {
        mapList.value.push(row);
        mapRef.value.refreshBlock();
      },
      delBlock(i: number) {
        mapList.value.splice(i, 1);
        mapRef.value.refreshBlock();
      },
      updateBlock(row: MapBlockDTO, i: number) {
        mapList.value.splice(i, 1, row);
        mapRef.value.refreshBlock();
      }
    };
    return { mapList, mapRef, ...methods };
  }
});
</script>
<style lang="scss" scoped>
.edit-main {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  & > div {
    padding: 20px;
  }
}
</style>
