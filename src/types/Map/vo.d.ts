const mapBlockType = {
  circle: "circle",
  rect: "rect",
  roundedRect: "roundedRect"
};
type BlockType = keyof typeof mapBlockType;
interface MapBlockVO {
  type: BlockType;
  x: number;
  y: number;
  width: number;
  height?: number;
  radius?: number;
  color?: number;
}

type XY = {
  x: number;
  y: number;
};
