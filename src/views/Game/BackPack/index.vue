<template>
  <g-drag-view title="物品栏" ref="GDVRef" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const GDVRef = ref();
    const methods = {
      reverse() {
        GDVRef.value.reverse();
      }
    };
    return { GDVRef, ...methods };
  }
});
</script>
