import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import Game from "/@/hooks/useGame";
import { useStore } from "/@/store";
import { MutationTypes } from "/@/store/modules/user/mutation-types";
export default defineComponent({
  setup() {
    const store = useStore();
    const mapWrapRef = ref();
    onMounted(() => {
      const game = new Game(mapWrapRef.value);
      store.commit(MutationTypes.SET_GAME, game);
      game.registeredControl();
    });
    onUnmounted(() => {
      store.commit(MutationTypes.CLEAR_GAME);
    });
    return {
      mapWrapRef
    };
  }
});
