export const mapBlockType = {
  circle: "circle",
  rect: "rect",
  roundedRect: "roundedRect"
};
export class MapBlockDTO implements MapBlockVO {
  type: BlockType = "rect";
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  radius = 0;
  color = 0xaaaaaa;
}
