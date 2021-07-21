<template>
  <g-drag-view title="角色面板" position="left" ref="GDVRef" />
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
