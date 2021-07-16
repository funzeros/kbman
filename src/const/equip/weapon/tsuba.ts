import { PartKindDTO } from "/@/types/Game/dto";

const tsubaAttrPool: PartKindAttr[] = [
  [
    "锷",
    "width: 100%;height: 10%;background-color: rgb(83, 72, 56);",
    {
      str: {
        value: 1
      }
    }
  ]
];
const tsubaPool: PartKind[] = tsubaAttrPool.map(m => new PartKindDTO(...m));
export default tsubaPool;
