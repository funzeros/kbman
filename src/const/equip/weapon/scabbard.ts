import { PartKindDTO } from "/@/types/Game/dto";
// 剑鞘
const scabbardAttrPool: PartKindAttr[] = [
  [
    "鞘",
    "height: 80%;width: 16%;border-top-right-radius: 50%;border-top-left-radius: 50%;background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);border: 1px solid #000;"
  ]
];
const scabbardPool: PartKind[] = scabbardAttrPool.map(
  m => new PartKindDTO(...m)
);
export default scabbardPool;
