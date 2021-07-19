import { PartKindDTO } from "/@/types/Game/dto";
const heartAttrPool: PartKindAttr[] = [
  [
    "梵",
    "height:20%;width:20%;position: absolute;top: 40%;left: 40%;border-radius: 50%;background-image: linear-gradient(to top, #d5d4d0 0%, #e9e9e7 100%);",
    {
      vit: [
        {
          value: 2
        }
      ]
    }
  ]
];
const heartPool: PartKind[] = heartAttrPool.map(m => new PartKindDTO(...m));
export default heartPool;
