interface MapBlockVO {
  type: "circle" | "rect" | "roundedRect";
  x: number;
  y: number;
  width: number;
  height?: number;
  radius?: number;
  color?: number;
}
