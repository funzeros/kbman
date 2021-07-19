import { GetterTree } from "vuex";
import Game from "../hooks/useGame";
import { KBWS } from "../hooks/useWs";
import { RootState } from "./types";

export type Getters = {
  game(state: RootState): Game | undefined;
  userInfo(state: RootState): UserInfoVO | undefined;
  KBWSIns(state: RootState): KBWS | undefined;
  dressedEquips(state: RootState): DressedEquips;
};

export const getters: GetterTree<RootState, RootState> & Getters = {
  game: state => state.user.game,
  userInfo: state => state.user.userInfo,
  KBWSIns: state => state.user.KBWSIns,
  dressedEquips: state => state.user.dressedEquips
};
