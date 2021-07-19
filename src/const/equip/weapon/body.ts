import { PartKindDTO } from "/@/types/Game/dto";
// 剑刃
const bodyAttrPool: PartKindAttr[] = [
  [
    "刃",
    "height: 60%;width: 10%;border-top-right-radius: 50%;border-top-left-radius: 50%;background-color: rgb(200, 200, 200);",
    {
      atk: [
        {
          value: 10
        }
      ],
      as: [
        {
          value: 100,
          isFixed: true
        }
      ]
    }
  ]
];
const bodyPool: PartKind[] = bodyAttrPool.map(m => new PartKindDTO(...m));
export default bodyPool;
