import { Application, Container, DisplayObject, Graphics } from "pixi.js";

export default class Engin {
  public readonly maxSize = 100000; // 地图大小 100K*100K像素
  public readonly bgColor = 0x313131;
  public readonly defaultColor = 0xaaaaaa;
  public readonly center = Math.round(this.maxSize / 2);
  public app: Application;
  public width: number;
  public height: number;
  public roleP = { x: 0, y: 0 };
  public mapContainer: Container;
  public roleContainer: Container;
  constructor(el: HTMLElement) {
    this.width = el.clientWidth;
    this.height = el.clientHeight;
    this.app = new Application({
      width: this.width,
      height: this.height,
      antialias: true,
      backgroundAlpha: 0,
      resolution: 1,
      backgroundColor: this.bgColor
    });
    this.mapContainer = new Container();
    this.roleContainer = new Container();
  }
  /**
   * 计算摄像机位置
   * @returns
   */
  public camera() {
    const x = -this.calcXY(this.roleP.x) + Math.round(this.width / 2);
    const y = -this.calcXY(this.roleP.y) + Math.round(this.height / 2);
    return { x, y };
  }
  /**
   * 计算相对坐标
   * @param p
   * @returns
   */
  public calcXY(p: number) {
    return this.center + p;
  }
  /**
   * 创建圆
   * @param x
   * @param y
   * @param r
   * @param c
   */
  public circle(x: number, y: number, r: number, c = this.defaultColor) {
    const circle = new Graphics();
    circle.beginFill(c);
    circle.drawCircle(0, 0, r);
    circle.x = this.calcXY(x);
    circle.y = this.calcXY(y);
    circle.endFill();
    this.mapAdd(circle);
  }
  /**
   * 创建矩形
   * @param x
   * @param y
   * @param w
   * @param h
   * @param c
   */
  public rect(
    x: number,
    y: number,
    w: number,
    h: number,
    c = this.defaultColor
  ) {
    const rect = new Graphics();
    rect.beginFill(c);
    rect.drawRect(0, 0, w, h);
    rect.x = this.calcXY(x);
    rect.y = this.calcXY(y);
    rect.endFill();
    this.mapAdd(rect);
  }
  /**
   * 创建圆角矩形
   * @param x
   * @param y
   * @param w
   * @param h
   * @param r
   * @param c
   */
  public roundedRect(
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    c = this.defaultColor
  ) {
    const rect = new Graphics();
    rect.beginFill(c);
    rect.drawRoundedRect(0, 0, w, h, r);
    rect.x = this.calcXY(x);
    rect.y = this.calcXY(y);
    rect.endFill();
    this.mapAdd(rect);
  }
  /**
   * 渲染地图
   * @param mapList MapBlockVO[]
   */
  public renderMap(mapList: MapBlockVO[]) {
    for (let index = 0; index < mapList.length; index++) {
      const m = mapList[index];
      try {
        if (m.type === "circle") this.circle(m.x, m.y, m.width, m.color);
        else if (m.type === "rect")
          this.rect(m.x, m.y, m.width, m.height || m.width, m.color);
        else if (m.type === "roundedRect")
          this.roundedRect(
            m.x,
            m.y,
            m.width,
            m.height || m.width,
            m.radius || 0,
            m.color
          );
      } catch (error) {
        console.error(new Error(error), m, "图块渲染出错");
      }
    }
  }
  /**
   * 追加元素到场景中
   * @param child Container
   */
  public stageAdd(child: Container) {
    child.width = this.maxSize;
    child.height = this.maxSize;
    child.x = this.camera().x;
    child.y = this.camera().y;
    this.app.stage.addChild(child);
  }
  /**
   * 更新摄像机位置
   */
  public refreshCamera() {
    this.roleContainer.x = this.camera().x;
    this.roleContainer.y = this.camera().y;
    this.mapContainer.x = this.camera().x;
    this.mapContainer.y = this.camera().y;
  }

  /**
   * 追加元素到角色中
   * @param child
   */
  public roleAdd(child: DisplayObject) {
    this.roleContainer.addChild(child);
  }
  public roleDel(child: DisplayObject) {
    this.roleContainer.removeChild(child);
  }
  /**
   * 追加元素到地图中
   * @param child
   */
  public mapAdd(child: DisplayObject) {
    this.mapContainer.addChild(child);
  }
  /**
   * 碰撞检测
   * @param a 检测目标1
   * @param b 检测目标2
   * @returns
   */
  static boxesIntersect(a: DisplayObject, b: DisplayObject) {
    const ab = a.getBounds();
    const bb = b.getBounds();
    return (
      ab.x + ab.width > bb.x &&
      ab.x < bb.x + bb.width &&
      ab.y + ab.height > bb.y &&
      ab.y < bb.y + bb.height
    );
  }
  /**
   * 碰撞检测（数组）
   * @param list 检测目标数组1
   * @param b 检测目标2
   * @returns
   */
  static arrayBoxesIntersect(list: DisplayObject[], b: DisplayObject) {
    return list.some(a => this.boxesIntersect(a, b));
  }
}
