import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import Game from "/@/hooks/useGame";
import { KBWS } from "/@/hooks/useWs";
import { useStore } from "/@/store";
import { MutationTypes } from "/@/store/modules/user/mutation-types";
import { GMap } from "/@/utils/custom";
export default defineComponent({
  setup() {
    const store = useStore();
    const mapWrapRef = ref();
    const sysncUsersFn: KBFn = (ws, res) => {
      store.getters.game.updatePlayers(res.data);
    };
    const syncDirectiveFn: KBFn = (ws, res) => {
      store.getters.game.exePlayerDirective(res.data);
    };
    const offlineFn: KBFn = (ws, res) => {
      store.getters.game.deletePlayer(res.sourceId);
    };
    const WSIns = store.getters.KBWSIns as KBWS;
    onMounted(() => {
      const game = new Game(mapWrapRef.value, store.getters.userInfo);
      store.commit(MutationTypes.SET_GAME, game);
      game.registeredControl();
      if (!WSIns) return;
      WSIns.on("syncUsers", sysncUsersFn);
      WSIns.on("syncDirective", syncDirectiveFn);
      WSIns.on("offline", offlineFn);
      game.addEvent("key", (game: Game) => {
        WSIns.send({
          type: "syncDirective",
          data: {
            roleP: game.roleP,
            keyPools: GMap.getKeys(game.keyPool)
          }
        });
      });
      WSIns.send({
        type: "syncUsers",
        data: { roleP: game.roleP, keyPools: [] }
      });
    });
    onUnmounted(() => {
      store.getters.game?.stopTicker();
      store.commit(MutationTypes.CLEAR_GAME);
      if (!WSIns) return;
      WSIns.remove("syncUsers", sysncUsersFn);
      WSIns.remove("syncUsers", syncDirectiveFn);
      WSIns.remove("offline", offlineFn);
    });
    return {
      mapWrapRef
    };
  }
});
