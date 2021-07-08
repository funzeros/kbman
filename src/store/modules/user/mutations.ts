import { MutationTypes } from "./mutation-types";
import { UserState } from "./types";
import storage from "store";
import { MutationTree } from "vuex";
import { UserInfoDTO } from "/@/types/Users/dto";
import { objEncodeToStr, strDecodeToObj } from "/@/utils/encrypt";
import Game from "/@/hooks/useGame";

export type Mutations<S = UserState> = {
  [MutationTypes.SET_USERINFO](state: S, payload: UserInfoDTO): void;
  [MutationTypes.CLEAR_USERINFO](state: S): void;
  [MutationTypes.GET_USERINFO](state: S): void;
  [MutationTypes.SET_GAME](state: S, payload: Game): void;
  [MutationTypes.CLEAR_GAME](state: S): void;
};

export const mutations: MutationTree<UserState> & Mutations = {
  [MutationTypes.SET_USERINFO](state, payload) {
    state.userInfo = payload;
    storage.set(MutationTypes.SET_USERINFO, objEncodeToStr(payload));
  },
  [MutationTypes.CLEAR_USERINFO](state) {
    state.userInfo = undefined;
    storage.remove(MutationTypes.SET_USERINFO);
  },
  [MutationTypes.GET_USERINFO](state) {
    const str = storage.get(MutationTypes.SET_USERINFO);
    if (str) {
      const obj = strDecodeToObj(str);
      state.userInfo = obj;
    }
  },
  [MutationTypes.SET_GAME](state, payload) {
    state.game = payload;
  },
  [MutationTypes.CLEAR_GAME](state) {
    state.game?.cancelledControl();
    state.game = undefined;
  }
};
