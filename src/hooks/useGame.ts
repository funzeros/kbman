import {
  Application,
  Graphics,
  Container,
  Text,
  DisplayObject,
  Ticker
} from "pixi.js";
import { mapBlockList } from "../const/map";
export default class Game {
  private readonly maxSize = 100000; // 地图大小 100K*100K像素
  private readonly bgColor = 0x313131;
  private readonly defaultColor = 0xaaaaaa;
  private readonly center = Math.round(this.maxSize / 2);
  private readonly effectiveKey = ["w", "a", "s", "d"];
  private app: Application;
  private mapContainer: Container;
  private roleContainer: Container;
  private width: number;
  private height: number;
  private keyPool = new Map<string, boolean>();
  private ticker: Ticker;
  public roleP = { x: 0, y: 0 };
  public speed = 1;
  public mPlayer: { role: Graphics; text: Text };
  public players = new Map<number, GObj>();
  /**
   * constructor
   * @param el
   */
  constructor(el: HTMLElement) {
    this.width = el.clientWidth;
    this.height = el.clientHeight;
    this.app = new Application({
      width: this.width,
      height: this.height,
      antialias: true,
      transparent: false,
      resolution: 1,
      backgroundColor: this.bgColor
    });
    this.mapContainer = new Container();
    this.roleContainer = new Container();
    // 添加舞台和容器
    this.stageAdd(this.mapContainer);
    this.stageAdd(this.roleContainer);
    el.appendChild(this.app.view);
    // 初始化添加
    this.renderMap(mapBlockList);
    this.mPlayer = this.role();
    this.ticker = new Ticker();
    this.ticker.minFPS = 30;
    this.ticker.maxFPS = 60;
    this.ticker.add(this.update);
    this.ticker.start();
  }
  /**
   * 更新操作
   * @param dt
   */
  private update = (dt: number) => {
    const oldXY = { x: this.roleP.x, y: this.roleP.y };
    this.move(dt);
    this.refreshRole();
    this.refreshCamera();
    if (Game.arrayBoxesIntersect(this.mapContainer.children, this.mPlayer.role))
      this.roleP = oldXY;
  };
  /**
   * 角色移动
   * @param dt
   */
  private move(dt: number) {
    if (this.keyPool.has("w")) this.roleP.y -= this.speed * dt;
    if (this.keyPool.has("a")) this.roleP.x -= this.speed * dt;
    if (this.keyPool.has("s")) this.roleP.y += this.speed * dt;
    if (this.keyPool.has("d")) this.roleP.x += this.speed * dt;
  }
  /**
   * 键盘控制
   * @param e
   * @returns
   */
  private controlKD = (e: KeyboardEvent) => {
    if (!this.effectiveKey.includes(e.key)) return;
    this.keyPool.set(e.key, true);
  };
  private controlKU = (e: KeyboardEvent) => {
    if (!this.effectiveKey.includes(e.key)) return;
    this.keyPool.delete(e.key);
  };
  public registeredControl() {
    document.body.addEventListener("keydown", this.controlKD);
    document.body.addEventListener("keyup", this.controlKU);
  }
  public cancelledControl() {
    document.body.removeEventListener("keydown", this.controlKD);
    document.body.removeEventListener("keyup", this.controlKU);
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
  private calcXY(p: number) {
    return this.center + p;
  }
  /**
   * 创建角色
   */
  public role() {
    const role = new Graphics();
    role.beginFill(0x22fe22);
    role.drawCircle(0, 0, 4);
    role.endFill();
    role.x = this.calcXY(this.roleP.x);
    role.y = this.calcXY(this.roleP.y);
    const text = new Text("Gems", { fontSize: "12px", fill: "#fff" });
    text.x = this.calcXY(this.roleP.x) + 5;
    text.y = this.calcXY(this.roleP.y) - 10;
    this.roleAdd(role);
    this.roleAdd(text);
    return { role, text };
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
  public refreshRole() {
    this.mPlayer.role.x = this.calcXY(this.roleP.x);
    this.mPlayer.role.y = this.calcXY(this.roleP.y);
    this.mPlayer.text.x = this.calcXY(this.roleP.x) + 5;
    this.mPlayer.text.y = this.calcXY(this.roleP.y) - 10;
  }
  /**
   * 追加元素到角色中
   * @param child Graphics
   */
  public roleAdd(child: Graphics | Text) {
    this.roleContainer.addChild(child);
  }
  /**
   * 追加元素到地图中
   * @param child Graphics
   */
  public mapAdd(child: Graphics) {
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
