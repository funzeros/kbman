export function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9
    ? "早上好"
    : hour <= 11
    ? "上午好"
    : hour <= 13
    ? "中午好"
    : hour < 20
    ? "下午好"
    : "晚上好";
}

export function welcome() {
  const arr = ["心态决定状态、思路决定出路、作为决定地位"];
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

export function toLowerCase(str: string) {
  return str.toLowerCase();
}
