<template>
  <div class="msg-item">
    <span>[{{ value.time }}]</span>
    <span>{{ value.name }}：</span>
    <span class="content" v-html="transf(value.content)"> </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    value: {
      type: Object as PropType<ChatVO>,
      required: true
    }
  },
  setup() {
    const methods = {
      transf(str: string) {
        // 去标签，转化faceicon后再渲染成html
        return (
          str
            .replace(/<(\w+)[^>]*>(.*?<\/\1>)?/g, "")
            // eslint-disable-next-line no-useless-escape
            .replace(/\[[\w\-]*\]/g, m => {
              return `<svg class="icon" aria-hidden="true" style="font-size: 30px;width:30px;height:30px;">
                    <use xlink:href="#face-${m.slice(1, m.length - 1)}"></use>
                  </svg>`;
            })
        );
      }
    };
    return {
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.msg-item {
  color: $--color-text-sub;
  word-break: break-all;
  line-height: 24px;
  &:not(:first-of-type) {
    margin-top: 5px;
  }
  :deep(svg) {
    transform: translateY(5px);
  }
  .content {
    color: $--color-text-secondary;
  }
}
</style>
