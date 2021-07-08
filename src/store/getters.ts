import { GetterTree } from "vuex";
import Game from "../hooks/useGame";
import { RootState } from "./types";

export type Getters = {
  game(state: RootState): Game | undefined;
};

export const getters: GetterTree<RootState, RootState> & Getters = {
  game: state => state.user.game
};
