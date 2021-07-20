export class GMath {
  /**
   * 随机长度数字
   * @param length
   * @param isNumber
   * @returns
   */
  static randomLenNum(length = 4, isNumber = true) {
    const str = (Math.random() * Math.pow(10, length)).toFixed(0);
    if (isNumber) return Number(str);
    else return new Array(length - str.length).fill("0").join("") + str;
  }
  static randomStr() {
    return Math.random().toString(36).slice(-8);
  }
  /**
   * 随机布尔值
   * @param float
   * @returns
   */
  static randomBoolean(float = 0.5) {
    return Math.random() < float;
  }
  /**
   * 随机数字范围
   * @param min
   * @param max
   * @param float
   * @returns
   */
  static randomRange(min: number, max: number, float = 0) {
    return this.precision(Math.random() * (max - min) + min, float);
  }
  /**
   * 随机返回数组中的一项
   * @param arr
   * @returns
   */
  static randomArray<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  static randomArrayLength(length: number) {
    return Math.floor(Math.random() * length);
  }
  /**
   * 精度控制
   * @param num
   * @param precision
   * @returns
   */
  static precision(num: number, precision = 2) {
    const dig = Math.pow(10, precision);
    const number = Number(num);
    if (isNaN(number)) return 0;
    return Math.round(number * dig) / dig;
  }
  /**
   * 判断两数或日期之间
   * @param source
   * @param target
   * @param border
   * @returns
   */
  static between(
    source: number | string | Date,
    target: (number | string | Date)[],
    border = false
  ) {
    const num =
      typeof source === "number" ? source : new Date(source).valueOf();
    const arr = target
      .map(m => {
        return typeof m === "number" ? m : new Date(m).valueOf();
      })
      .sort();
    if (border) return num >= arr[0] && num <= arr[1];
    else return num >= arr[0] && num < arr[1];
  }
}
export class GMap<K, V> extends Map<K, V> {
  static array<Key, Value>(map: GMap<Key, Value> | Map<Key, Value>) {
    return Array.from(map, ([k, v]) => ({ key: k, value: v }));
  }
  static getKeys<Key, Value>(map: GMap<Key, Value> | Map<Key, Value>) {
    return Array.from(map, ([k]) => k);
  }
  getKeys() {
    return Array.from(this, ([k]) => k);
  }
  getValues() {
    return Array.from(this, ([, v]) => v);
  }
  getEntries() {
    return Array.from(this);
  }
  map<R>(fn: (v: V, k: K, i: number) => R): R[] {
    return Array.from(this, ([k, v], i) => fn(v, k, i));
  }
  filter(fn: (m: V) => boolean) {
    const arr: V[] = [];
    this.forEach(m => {
      if (fn(m)) arr.push(m);
    });
    return arr;
  }
}
