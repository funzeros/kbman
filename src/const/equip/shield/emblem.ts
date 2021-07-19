import { PartKindDTO } from "/@/types/Game/dto";
// 盾纹
const emblemAttrPool: PartKindAttr[] = [
  [
    "凰",
    " position: absolute;top: 0;left: 0;width: 100%;height: 100%;clip-path: polygon(26% 1%,5% 46%,28% 53%,9% 81%,32% 89%,62% 86%,62% 63%,82% 89%,70% 57%,95% 73%,79% 46%,92% 25%,41% 53%,64% 9%,37% 40%,40% 8%,22% 41%);background-image: linear-gradient(to top, #ff0844 0%, #ffb199 100%);",
    {
      hp: [
        {
          value: 5
        },
        {
          value: 0.1,
          isPercent: true
        }
      ]
    }
  ]
];
const emblemPool: PartKind[] = emblemAttrPool.map(m => new PartKindDTO(...m));
export default emblemPool;
