import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import Game from "/@/hooks/useGame";
import { KBWS } from "/@/hooks/useWs";
import { useStore } from "/@/store";
import { MutationTypes } from "/@/store/modules/user/mutation-types";
export default defineComponent({
  setup() {
    const store = useStore();
    const mapWrapRef = ref();
    const sysncUsersFn: KBFn = (ws, res) => {
      store.getters.game.updatePlayers(res.data);
    };
    const WSIns = store.getters.KBWSIns as KBWS;
    onMounted(() => {
      const game = new Game(mapWrapRef.value, store.getters.userInfo);
      store.commit(MutationTypes.SET_GAME, game);
      game.registeredControl();
      WSIns.on("syncUsers", sysncUsersFn);
      // game.addTickEvent(({ roleP: { x, y } }) => {
      //   WSIns.send({ type: "syncUsers", data: { x, y } });
      // });
    });
    onUnmounted(() => {
      store.getters.game?.stopTicker();
      store.getters.game?.clearTicker();
      store.commit(MutationTypes.CLEAR_GAME);
      WSIns.remove("syncUsers", sysncUsersFn);
    });
    return {
      mapWrapRef
    };
  }
});
