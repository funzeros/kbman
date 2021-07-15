import { BaseProps } from "/@/types/Game/dto";

/**
 * EquipTypeOption
 */
export const EquipTypeOption: EquipOptVO<BaseProps> = {
  weapon: {
    type: "weapon",
    baseProp: ["str", "atk", "as", "hit"],
    parts: [
      {
        name: "剑锋",
        odds: 0.9
      },
      {
        name: "剑锷",
        odds: 0.4
      },
      {
        name: "剑刃",
        odds: 1
      },
      {
        name: "剑格",
        odds: 0.6
      },
      {
        name: "剑茎",
        odds: 1
      },
      {
        name: "剑首",
        odds: 0.1
      },
      {
        name: "剑穗",
        odds: 0.1
      },
      {
        name: "剑鞘",
        odds: 0.05
      }
    ]
  },
  shield: {
    type: "shield",
    baseProp: ["def", "vit"],
    parts: []
  },
  lorica: {
    type: "lorica",
    baseProp: ["def", "vit"],
    parts: []
  }
};
