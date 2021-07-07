const useAntiShake = () => {
  const antiShake: GObj = {
    flag1: true,
    timer: null,
    flag2: true
  };
  // 先执行 后延时
  const delayAS = (cb: Fn, delay = 3000) => {
    if (antiShake.flag1) {
      antiShake.flag1 = false;
      cb();
      setTimeout(() => {
        antiShake.flag1 = true;
      }, delay);
    }
  };
  // 先执行 后延时，每次操作刷新延时
  const holdAS = (cb: Fn, delay = 1000) => {
    clearTimeout(antiShake.timer);
    if (antiShake.flag2) {
      antiShake.flag2 = false;
      cb();
    }
    antiShake.timer = setTimeout(() => {
      antiShake.flag2 = true;
    }, delay);
  };
  // 先延时 后执行 每次操作刷新延时
  const reholdAS = (cb: Fn, delay = 1000) => {
    clearTimeout(antiShake.timer);
    antiShake.timer = setTimeout(() => {
      cb();
    }, delay);
  };
  return {
    delayAS,
    holdAS,
    reholdAS
  };
};

export default useAntiShake;
