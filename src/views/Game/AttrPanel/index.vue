<template>
  <g-drag-view title="角色面板" position="left" ref="GDVRef">
    <div>{{ userProperty }}</div>
  </g-drag-view>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "/@/store";
export default defineComponent({
  setup() {
    const store = useStore();
    const GDVRef = ref();
    const userProperty = computed(() => store.getters.userProperty);
    const methods = {
      reverse() {
        GDVRef.value.reverse();
      }
    };
    return { GDVRef, ...methods, userProperty };
  }
});
</script>
