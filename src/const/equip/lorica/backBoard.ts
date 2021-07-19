import { PartKindDTO } from "/@/types/Game/dto";

const backBoardAttrPool: PartKindAttr[] = [
  [
    "咒",
    "height: 100%;width: 100%;background-color: rgb(66,66,66);clip-path: polygon(20% 17%, 32% 16%, 48% 26%, 57% 27%, 72% 15%, 81% 16%, 83% 24%, 78% 33%, 82% 42%, 76% 89%, 20% 90%, 17% 45%, 22% 36%, 18% 24%);filter",
    {
      def: [
        {
          value: 10
        }
      ],
      vit: [
        {
          value: 1
        }
      ]
    }
  ]
];
const backBoardPool: PartKind[] = backBoardAttrPool.map(
  m => new PartKindDTO(...m)
);
export default backBoardPool;
