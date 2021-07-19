import { PartKindDTO } from "/@/types/Game/dto";
// 剑格
const caseAttrPool: PartKindAttr[] = [
  [
    "风",
    "width: 30%;height: 10%;background-image: linear-gradient(to right,#fcc5e4 0%,#fda34b 15%,#ff7882 35%,#c8699e 52%);border-radius: 40% 40% 40% 40% / 60% 60% 40% 40%;",
    {
      dex: [
        {
          value: 2
        }
      ],
      hit: [
        {
          value: -2,
          isFixed: true
        }
      ]
    }
  ]
];
const casePool: PartKind[] = caseAttrPool.map(m => new PartKindDTO(...m));
export default casePool;
