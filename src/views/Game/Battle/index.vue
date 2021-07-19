<template>
  <teleport to="body">
    <div class="mask-model flex-c-c" :class="{ dialogShow }">
      <div class="top" @click="endBattle"></div>
      <div class="bottom">
        <Keyboard />
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import script from "./index.script";
export default script;
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
