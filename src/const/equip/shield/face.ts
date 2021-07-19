import { PartKindDTO } from "/@/types/Game/dto";
// 盾面
const faceAttrPool: PartKindAttr[] = [
  [
    "默",
    " width: 90%;height: 90%;background-image: linear-gradient(to left, #bdbbbe 0%, #9d9ea3 100%),radial-gradient(88% 271%,rgba(255, 255, 255, 0.25) 0%,rgba(254, 254, 254, 0.25) 1%,rgba(0, 0, 0, 0.25) 100%),radial-gradient(50% 100%,rgba(255, 255, 255, 0.3) 0%,rgba(0, 0, 0, 0.3) 100%);clip-path: polygon(0% 25%,10% 70%,50% 100%,90% 70%,100% 25%,75% 0%,50% 15%,25% 0%);",
    {
      def: [
        {
          value: 2
        }
      ],
      vit: [
        {
          value: 0.2
        }
      ]
    }
  ]
];
const facePool: PartKind[] = faceAttrPool.map(m => new PartKindDTO(...m));
export default facePool;
