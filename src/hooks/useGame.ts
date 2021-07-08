import { Graphics, Text, Ticker } from "pixi.js";
import { mapBlockList } from "../const/map";
import Engin from "./useEngin";
export default class Game extends Engin {
  private readonly effectiveKey = ["w", "a", "s", "d"];
  private keyPool = new Map<string, boolean>();
  private ticker: Ticker;
  public speed = 1;
  public mPlayer: { role: Graphics; text: Text };
  public players = new Map<number, GObj>();
  /**
   * constructor
   * @param el
   */
  constructor(el: HTMLElement) {
    super(el);
    // 添加舞台和容器
    this.stageAdd(this.mapContainer);
    this.stageAdd(this.roleContainer);
    el.appendChild(this.app.view);
    // 初始化添加
    this.renderMap(mapBlockList);
    this.mPlayer = this.role();
    this.ticker = new Ticker();
    this.ticker.autoStart = true;
    this.ticker.minFPS = 30;
    this.ticker.maxFPS = 144;
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
  public refreshRole() {
    this.mPlayer.role.x = this.calcXY(this.roleP.x);
    this.mPlayer.role.y = this.calcXY(this.roleP.y);
    this.mPlayer.text.x = this.calcXY(this.roleP.x) + 5;
    this.mPlayer.text.y = this.calcXY(this.roleP.y) - 10;
  }
}
