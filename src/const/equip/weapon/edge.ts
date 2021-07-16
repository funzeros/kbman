import { PartKindDTO } from "/@/types/Game/dto";
// 剑锋
const edgeAttrPool: PartKindAttr[] = [
  [
    "锋",
    "box-shadow: 0 0 6px 2px #fff, 0 0 1px 0 #000 inset;",
    {
      atk: {
        value: 10,
        isPercent: true,
        isFixed: true
      },
      str: {
        value: -10,
        isPercent: true,
        isFixed: true
      }
    }
  ]
];
const edgePool: PartKind[] = edgeAttrPool.map(m => new PartKindDTO(...m));
export default edgePool;
