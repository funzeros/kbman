import { PartKindDTO } from "/@/types/Game/dto";
// 剑首
const headAttrPool: PartKindAttr[] = [
  [
    "白虎",
    "margin-top: -5%;width: 10%;height: 10%;background-image: linear-gradient(to top, #ff0844 0%, #ffb199 100%);border-radius: 50%;"
  ]
];
const headPool: PartKind[] = headAttrPool.map(m => new PartKindDTO(...m));
export default headPool;
