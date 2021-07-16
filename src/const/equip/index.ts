import bodyPool from "./weapon/body";
import casePool from "./weapon/case";
import edgePool from "./weapon/edge";
import headPool from "./weapon/head";
import scabbardPool from "./weapon/scabbard";
import stalkPool from "./weapon/stalk";
import tsubaPool from "./weapon/tsuba";

export const qualityMap: StrObj = {
  100: "完美无缺",
  90: "鬼斧神工",
  80: "巧夺天工",
  70: "朴实无华",
  60: "平庸略堪",
  50: "粗制滥造"
};
/**
 * EquipTypeOption
 */
export const EquipTypeOption: EquipOptVO<BaseProps> = {
  weapon: {
    type: "weapon",
    baseProp: ["str", "atk", "as", "hit"],
    parts: [
      {
        label: "scabbard",
        name: "剑鞘",
        odds: 0.1,
        partPool: scabbardPool
      },
      {
        label: "edge",
        name: "剑锋",
        odds: 0.8,
        partPool: edgePool
      },
      {
        label: "tsuba",
        name: "剑锷",
        odds: 0.5,
        partPool: tsubaPool
      },
      {
        label: "case",
        name: "剑格",
        odds: 1,
        partPool: casePool
      },
      {
        label: "body",
        name: "剑刃",
        odds: 1,
        partPool: bodyPool
      },
      {
        label: "stalk",
        name: "剑茎",
        odds: 1,
        partPool: stalkPool
      },
      {
        label: "head",
        name: "剑首",
        odds: 0.2,
        partPool: headPool
      }
    ],
    buildName(opt) {
      const { scabbard, edge, case: swordCase, body, stalk, head } = opt;
      const nameArr: string[] = [];
      scabbard && nameArr.push(scabbard);
      edge || nameArr.push("无锋");
      nameArr.push(`${swordCase}${body}剑${stalk}${swordCase}`);
      head && nameArr.push(head);
      return nameArr.join("·");
    }
  },
  shield: {
    type: "shield",
    baseProp: ["def", "vit"],
    parts: [],
    buildName() {
      return "";
    }
  },
  lorica: {
    type: "lorica",
    baseProp: ["def", "vit"],
    parts: [],
    buildName() {
      return "";
    }
  }
};
