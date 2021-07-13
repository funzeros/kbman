import { Graphics, Text } from "pixi.js";
import { mapBlockList } from "../const/map";
import Engin from "./useEngin";

type Player = {
  role: Graphics;
  text: Text;
};
export default class Game extends Engin {
  private readonly effectiveKey = ["w", "a", "s", "d"];
  private keyPool = new Map<string, boolean>();
  public speed = 1;
  public mPlayer: Player;
  public players = new Map<number, Player>();
  public user: UserInfoVO;
  private colorList = [0x22fe22, 0xffffff, 0x2222fe, 0xfefe22];
  /**
   * constructor
   * @param el
   * @param user
   */
  constructor(el: HTMLElement, user: UserInfoVO) {
    super(el);
    this.user = user;
    this.roleP.x = user.x;
    this.roleP.y = user.y;
    // 添加舞台和容器
    this.stageAdd(this.mapContainer);
    this.stageAdd(this.roleContainer);
    el.appendChild(this.app.view);
    // 初始化添加
    this.renderMap(mapBlockList);
    this.mPlayer = this.role(this.user.name, this.roleP);
    this.app.ticker.autoStart = true;
    this.app.ticker.minFPS = 30;
    this.app.ticker.maxFPS = 60;
    this.app.ticker.add(this.update);
    this.app.ticker.start();
  }
  /**
   * 更新操作
   * @param dt
   */
  private update = (dt: number) => {
    const oldXY = { x: this.roleP.x, y: this.roleP.y };
    this.move(dt);
    if (this.roleP.x === oldXY.x && this.roleP.y === oldXY.y) return;
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
    if (window.isInput) return;
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
  public role(name: string, xy: XY, type = 0) {
    const role = new Graphics();
    role.beginFill(this.colorList[type]);
    role.drawCircle(0, 0, 4);
    role.endFill();
    role.x = this.calcXY(xy.x);
    role.y = this.calcXY(xy.y);
    const text = new Text(name, {
      fontSize: "12px",
      fill: this.colorList[type]
    });
    text.x = this.calcXY(xy.x) + 5;
    text.y = this.calcXY(xy.y) - 10;
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
  public refreshOtherRole(player: Player, xy: XY) {
    player.role.x = this.calcXY(xy.x);
    player.role.y = this.calcXY(xy.y);
    player.text.x = this.calcXY(xy.x) + 5;
    player.text.y = this.calcXY(xy.y) - 10;
  }
  public addTickEvent(cb: Fn) {
    this.app.ticker.add(() => cb(this));
  }
  public stopTicker() {
    this.app.ticker.stop();
  }
  public clearTicker() {
    this.app.ticker.destroy();
  }
  public startTicker() {
    this.app.ticker.start();
  }
  public updatePlayers(players: UserInfoVO[]) {
    const ids: number[] = [];
    players.forEach(m => {
      // 如果是自己，跳过
      ids.push(m.id);
      if (m.id === this.user.id) return;
      // 新玩家 插入
      if (!this.players.has(m.id)) {
        const oPlayer = this.role(m.name, { x: m.x, y: m.y }, 1);
        this.players.set(m.id, oPlayer);
      }
      // 更新玩家位置
      const player = this.players.get(m.id) as Player;
      this.refreshOtherRole(player, { x: m.x, y: m.y });
    });
    this.players.forEach((v, k) => {
      if (ids.includes(k)) return;
      const { role, text } = this.players.get(k) as Player;
      this.roleDel(role);
      this.roleDel(text);
      this.players.delete(k);
    });
  }
}
