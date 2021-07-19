import backBoardPool from "./lorica/backBoard";
import frontBoardPool from "./lorica/frontBoard";
import heartPool from "./lorica/heart";
import emblemPool from "./shield/emblem";
import facePool from "./shield/face";
import holdPool from "./shield/hold";
import sharpPool from "./shield/sharp";
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
    parts: [
      {
        label: "sharp",
        name: "盾角",
        odds: 0.2,
        partPool: sharpPool
      },
      {
        label: "face",
        name: "盾面",
        odds: 1,
        partPool: facePool
      },
      {
        label: "emblem",
        name: "盾纹",
        odds: 1,
        partPool: emblemPool
      },
      {
        label: "hold",
        name: "挽手",
        odds: 1,
        partPool: holdPool
      }
    ],
    buildName(opt) {
      const { sharp, face, emblem, hold } = opt;
      const nameArr: string[] = [];
      sharp && nameArr.push(sharp);
      nameArr.push(`${emblem}${face}盾${hold}${emblem}`);
      return nameArr.join("·");
    }
  },
  lorica: {
    type: "lorica",
    baseProp: ["hp", "vit"],
    parts: [
      {
        label: "frontBoard",
        name: "胸板",
        odds: 1,
        partPool: frontBoardPool
      },
      {
        label: "heart",
        name: "护心镜",
        odds: 1,
        partPool: heartPool
      },
      {
        label: "backBoard",
        name: "背板",
        odds: 1,
        partPool: backBoardPool
      }
    ],
    buildName(opt) {
      const { frontBoard, heart, backBoard } = opt;
      const nameArr: string[] = [];
      nameArr.push(`${heart}${frontBoard}衣${backBoard}${heart}`);
      return nameArr.join("·");
    }
  }
};
