import { Graphics, Text } from "pixi.js";
import { mapBlockList } from "../const/map";
import { toLowerCase } from "../utils/text";
import Engin from "./useEngin";

type Player = {
  role: Graphics;
  text: Text;
  userInfo: UserInfoVO;
};
export class Game extends Engin {
  private readonly effectiveKey = ["w", "a", "s", "d"];
  public keyPool = new Map<string, boolean>();
  public speed = 1;
  public mPlayer: Player;
  public players = new Map<number, Player>();
  public user: UserInfoVO;
  private colorList = [0x22fe22, 0xffffff, 0x2222fe, 0xfefe22];
  private eventPool: EventPool<EventPoolKeys> = {
    keyDown: [],
    keyUp: [],
    key: []
  };
  /**
   * constructor
   * @param el
   * @param user
   */
  constructor(el: HTMLElement, user: UserInfoVO) {
    super(el);
    this.user = user;
    this.roleP.x = user.roleP.x;
    this.roleP.y = user.roleP.y;
    // 添加舞台和容器
    this.stageAdd(this.mapContainer);
    this.stageAdd(this.roleContainer);
    el.appendChild(this.app.view);
    // 初始化添加
    this.renderMap(mapBlockList);
    this.mPlayer = {
      ...this.role(this.user.name, this.roleP),
      userInfo: this.user
    };
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
    this.refreshOthers(dt);
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
  private moveOthers(dt: number, player: Player) {
    const { userInfo } = player;
    const { keyPools } = userInfo;
    if (keyPools.includes("w")) userInfo.roleP.y -= this.speed * dt;
    if (keyPools.includes("a")) userInfo.roleP.x -= this.speed * dt;
    if (keyPools.includes("s")) userInfo.roleP.y += this.speed * dt;
    if (keyPools.includes("d")) userInfo.roleP.x += this.speed * dt;
  }
  /**
   * 键盘控制
   * @param e
   * @returns
   */
  private controlKD = (e: KeyboardEvent) => {
    if (window.isInput) return;
    const key = toLowerCase(e.key);
    if (!this.effectiveKey.includes(key)) return;
    if (this.keyPool.has(key)) return;
    this.keyPool.set(key, true);
    this.executeEvent("key", e);
  };
  private controlKU = (e: KeyboardEvent) => {
    const key = toLowerCase(e.key);
    if (!this.effectiveKey.includes(key)) return;
    if (!this.keyPool.has(key)) return;
    this.keyPool.delete(key);
    this.executeEvent("key", e);
  };
  private executeEvent(eventName: EventPoolKeys, e: Event) {
    this.eventPool[eventName].forEach(m => {
      m(this, e);
    });
  }
  public registeredControl() {
    document.body.addEventListener("keydown", this.controlKD);
    document.body.addEventListener("keyup", this.controlKU);
  }
  public cancelledControl() {
    document.body.removeEventListener("keydown", this.controlKD);
    document.body.removeEventListener("keyup", this.controlKU);
  }
  public addEvent(eventName: EventPoolKeys, func: Fn) {
    this.eventPool[eventName].push(func);
  }
  public removeEvent(eventName: EventPoolKeys, func: Fn) {
    const index = this.eventPool[eventName].findIndex(
      fn => fn === func
    ) as number;
    if (index > -1) this.eventPool[eventName].splice(index, 1);
  }
  public clearEvent() {
    Object.keys(this.eventPool).forEach(k => {
      const key = k as EventPoolKeys;
      this.eventPool[key].length = 0;
    });
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
  public refreshOthers(dt: number) {
    this.players.forEach(m => {
      if (m.userInfo.keyPools.length) {
        const oldXY = { x: m.userInfo.roleP.x, y: m.userInfo.roleP.y };
        this.moveOthers(dt, m);
        this.refreshOtherRole(m, {
          x: m.userInfo.roleP.x,
          y: m.userInfo.roleP.y
        });
        if (Game.arrayBoxesIntersect(this.mapContainer.children, m.role))
          m.userInfo.roleP = oldXY;
      }
    });
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
  public destroy() {
    this.clearTicker();
    this.cancelledControl();
    this.clearEvent();
  }
  public updatePlayers(players: UserInfoVO[]) {
    const ids: number[] = [];
    players.forEach(m => {
      // 如果是自己，跳过
      ids.push(m.id);
      if (m.id === this.user.id) return;
      // 新玩家 插入
      if (!this.players.has(m.id)) {
        const oPlayer = {
          ...this.role(m.name, { x: m.roleP.x, y: m.roleP.y }, 1),
          userInfo: m
        };
        this.players.set(m.id, oPlayer);
      }
      // 更新玩家位置
      const player = this.players.get(m.id) as Player;
      this.refreshOtherRole(player, { x: m.roleP.x, y: m.roleP.y });
    });
    this.players.forEach((v, k) => {
      if (ids.includes(k)) return;
      this.deletePlayer(k);
    });
  }
  /**
   * 删除玩家
   * @param id
   */
  public deletePlayer(id: number) {
    if (!this.players.has(id)) return;
    const { role, text } = this.players.get(id) as Player;
    this.roleDel(role);
    this.roleDel(text);
    this.players.delete(id);
  }
  /**
   * 执行玩家指令
   * @param data
   */
  public exePlayerDirective(data: UserInfoVO) {
    if (this.players.has(data.id)) {
      // 存在就修改状态
      const player = this.players.get(data.id) as Player;
      Object.assign(player.userInfo, data);
      this.players.set(data.id, player);
      this.refreshOtherRole(player, { x: data.roleP.x, y: data.roleP.y });
    } else {
      // 如果不存在则新增玩家
      const oPlayer = {
        ...this.role(data.name, { x: data.roleP.x, y: data.roleP.y }, 1),
        userInfo: data
      };
      this.players.set(data.id, oPlayer);
    }
  }
}
const useGame = (baseline = 250) => {
  return {
    /**
     *
     * @param f 加成来源
     * @param t 加成对象
     * @returns
     */
    calcBonus(f: number, t: number) {
      return Math.round((1 + f / baseline) * t);
    }
  };
};
export default useGame;
