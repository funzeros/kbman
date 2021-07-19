import { PartKindDTO } from "/@/types/Game/dto";
// 挽手
const holdAttrPool: PartKindAttr[] = [
  [
    "炽",
    "background-color: rgb(255, 128, 128);height: 10%;width: 60%;",
    {
      str: [
        {
          value: 0.2
        }
      ]
    }
  ]
];
const holdPool: PartKind[] = holdAttrPool.map(m => new PartKindDTO(...m));
export default holdPool;
