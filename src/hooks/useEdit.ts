import { Ticker } from "pixi.js";
import Engin from "./useEngin";
export default class Edit extends Engin {
  private readonly effectiveKey = ["w", "a", "s", "d"];
  private keyPool = new Map<string, boolean>();
  private ticker: Ticker;
  public speed = 10;
  public players = new Map<number, GObj>();
  /**
   * constructor
   * @param el
   */
  constructor(el: HTMLElement) {
    super(el);
    // 添加舞台和容器
    this.stageAdd(this.mapContainer);
    el.appendChild(this.app.view);
    // 初始化添加
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
    this.move(dt);
    this.refreshCamera();
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
}
