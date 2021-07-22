import { GetterTree } from "vuex";
import { Equip } from "../hooks/useEquip";
import useGame, { Game } from "../hooks/useGame";
import { KBWS } from "../hooks/useWs";
import { RootState } from "./types";

export type Getters = {
  game(state: RootState): Game | undefined;
  userInfo(state: RootState): UserInfoVO | undefined;
  KBWSIns(state: RootState): KBWS | undefined;
  dressedEquips(state: RootState): DressedEquips;
  equipProperty(state: RootState): BasePropertyVO;
  userProperty(state: RootState, getters: GObj): BasePropertyVO;
};

export const getters: GetterTree<RootState, RootState> & Getters = {
  game: state => state.user.game,
  userInfo: state => state.user.userInfo,
  KBWSIns: state => state.user.KBWSIns,
  dressedEquips: state => state.user.dressedEquips,
  equipProperty: state => {
    return Equip.statisticsTotalEquip(state.user.dressedEquips);
  },
  userProperty: (state, getters) => {
    const { calcBonus } = useGame();
    const {
      str,
      vit,
      dex,
      hp,
      atk,
      def,
      as,
      dod,
      hit,
      cri,
      crd,
      add,
      fin,
      red,
      ign,
      fen,
      fre,
      ien,
      ire,
      len,
      lre,
      den,
      dre
    } = getters.equipProperty;
    return {
      str,
      vit,
      dex,
      hp: calcBonus(vit, hp),
      atk: calcBonus(str, atk),
      def: calcBonus(vit, def),
      as: calcBonus(dex, as) + 1000,
      dod,
      hit,
      cri,
      crd,
      add,
      fin,
      red,
      ign,
      fen,
      fre,
      ien,
      ire,
      len,
      lre,
      den,
      dre
    } as BasePropertyVO;
  }
};
