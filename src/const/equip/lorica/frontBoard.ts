import { PartKindDTO } from "/@/types/Game/dto";

const frontBoardAttrPool: PartKindAttr[] = [
  [
    "风",
    "height: 100%;width: 100%;background-image: linear-gradient(to right, #92fe9d 0%, #00c9ff 100%);clip-path: polygon(20% 17%, 32% 16%, 48% 26%, 57% 27%, 72% 15%, 81% 16%, 83% 24%, 78% 33%, 82% 42%, 76% 89%, 20% 90%, 17% 45%, 22% 36%, 18% 24%);filter",
    {
      def: [
        {
          value: 10
        }
      ],
      dex: [
        {
          value: 1
        }
      ]
    }
  ]
];
const frontBoardPool: PartKind[] = frontBoardAttrPool.map(
  m => new PartKindDTO(...m)
);
export default frontBoardPool;
