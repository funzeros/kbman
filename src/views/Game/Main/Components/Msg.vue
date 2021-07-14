<template>
  <div class="msg-wrap">
    <div class="list p-12">
      <el-scrollbar ref="scrollRef">
        <MsgItem
          v-for="(item, i) of msgList"
          :value="item"
          :key="'msg_item_' + i"
        />
      </el-scrollbar>
    </div>
    <div class="input">
      <div class="face">
        <el-popover
          placement="top"
          title="表情"
          :width="420"
          trigger="manual"
          v-model:visible="visible"
        >
          <template #reference>
            <face-icon
              value="face-1011"
              size="30px"
              @click="visible = !visible"
            ></face-icon>
          </template>
          <div class="face-grid">
            <div
              class="face-item"
              v-for="item of faceList"
              :key="item.icon_id"
              :title="item.name"
            >
              <face-icon
                :value="'face-' + item.font_class"
                size="30px"
                @click="handleInsertFace(item.font_class)"
              ></face-icon>
            </div>
          </div>
        </el-popover>
      </div>
      <el-input
        ref="inputRef"
        v-model.trim="content"
        maxlength="255"
        @keyup.enter="handleSend(content)"
        @focus="handleFocus()"
        @blur="handleBlur()"
      ></el-input>
      <div class="send" @click="handleSend(content)">发送</div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch
} from "vue";
import { useStore } from "/@/store";
import MsgItem from "./MsgItem.vue";
import useAntiShake from "/@/hooks/useAntiShake";
import { faceDataJSON } from "/@/styles/index";

export default defineComponent({
  components: { MsgItem },
  setup() {
    const store = useStore();
    const { delayAS } = useAntiShake();
    const content = ref("");
    const visible = ref(false);
    const offset = ref(0);
    const inputRef = ref();
    const scrollRef = ref();
    const methods = {
      clearContent() {
        content.value = "";
      },
      handleSend(content: string) {
        if (!content) return;
        delayAS(() => {
          store.state.user.KBWSIns?.send<Partial<ChatVO>>({
            type: "chat",
            data: {
              content
            }
          });
          this.clearContent();
        }, 200);
        visible.value = false;
      },
      handleFocus() {
        window.isInput = true;
        visible.value = false;
      },
      handleBlur() {
        offset.value = inputRef.value.$el.children[0].selectionStart;
        window.isInput = false;
      },
      scrollToBottom() {
        nextTick(() => {
          scrollRef.value.wrap.scrollTop = scrollRef.value.wrap.scrollHeight;
        });
      },
      handleInsertFace(fontClass: string) {
        if (fontClass) {
          content.value = `${content.value.slice(
            0,
            offset.value
          )}[${fontClass}]${content.value.slice(offset.value)}`;
        }
      }
    };
    const msgList = computed(() => {
      return store.state.user.msgList;
    });
    watch(() => msgList.value.length, methods.scrollToBottom);
    onMounted(() => {
      methods.scrollToBottom();
    });
    return {
      faceList: faceDataJSON.glyphs,
      visible,
      scrollRef,
      inputRef,
      content,
      msgList,
      ...methods
    };
  }
});
</script>
<style lang="scss" scoped>
.msg-wrap {
  box-shadow: 0 0 0 1px $--color-text-regular inset;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  .list {
    height: calc(100% - 30px);
    overflow: hidden;
  }
  .input {
    display: flex;
    height: 30px;
    border-top: 1px solid $--color-text-regular;
    .face {
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > svg {
        cursor: pointer;
      }
    }
    .el-input {
      flex: 1;
      height: 30px;
      line-height: 30px;
      :deep(input) {
        border: none;
        outline: none;
        background: transparent;
        height: inherit;
        line-height: inherit;
        color: $--color-text-placeholder;
      }
    }
    .send {
      font-size: 14px;
      width: 40px;
      line-height: 30px;
      cursor: pointer;
      &:hover {
        color: $--color-text-secondary;
      }
      &:active {
        color: $--color-text-regular;
      }
    }
  }
}
.face-grid {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  justify-items: center;
  align-items: center;
  .face-item {
    width: 40px;
    height: 40px;
    & > svg {
      cursor: pointer;
    }
  }
}
</style>
