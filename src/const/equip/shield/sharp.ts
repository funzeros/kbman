import { PartKindDTO } from "/@/types/Game/dto";
// 盾角
const sharpAttrPool: PartKindAttr[] = [
  [
    "禁",
    "position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: conic-gradient(from 90deg, #666, #eee);opacity: 0.5;mix-blend-mode: overlay;",
    {
      atk: [
        {
          value: 0.4
        }
      ]
    }
  ]
];
const sharpPool: PartKind[] = sharpAttrPool.map(m => new PartKindDTO(...m));
export default sharpPool;
