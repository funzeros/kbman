export function pageOption(size = 10) {
  return {
    current: 1,
    size
  };
}

export function initPagination(size = "10"): PageParam {
  return {
    current: "1",
    size,
    total: "0"
  };
}

export function initPageOption(size = "10"): Partial<PageParam> {
  return {
    current: "1",
    size
  };
}
