import { PartKindDTO } from "/@/types/Game/dto";
// 剑茎
const stalkAttrPool: PartKindAttr[] = [
  [
    "翠",
    "width: 10%;height: 20%;background-image: linear-gradient(to right, #868f96 0%, #596164 100%);border-radius: 0 0 50% 50% / 0 0 10% 10%;"
  ]
];
const stalkPool: PartKind[] = stalkAttrPool.map(m => new PartKindDTO(...m));
export default stalkPool;
