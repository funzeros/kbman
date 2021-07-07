import { ref, onMounted, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PageOptionDTO, PageParamDTO } from "/@/types/Util/dto";
/**
 *
 * @param reqFunction 分页请求函数
 * @param isRoute 是否反应在路由上
 * @param gFilterForm 类别参数初始化函数
 * @param gSearchForm 搜索参数初始化函数
 */
export function usePagination<T>(
  reqFunction: (params: Partial<PageParam>) => Promise<R<PageResult<T>>>,
  // 是否使用路由
  isRoute = true,
  gFilterForm: (opt?: GObj) => GObj = () => ({}),
  gSearchForm: (opt?: GObj) => GObj = () => ({}),
  emit?: EmitType,
  initSize = 10
) {
  // use
  const route = useRoute();
  const router = useRouter();

  // ref
  const isLoadTable = ref(false);
  // 自行类处理从路由获取
  const filterForm = ref(gFilterForm(route.query));
  const searchForm = ref(gSearchForm(route.query));
  // 分页组件记录
  const pageOption = ref(
    new PageOptionDTO({
      total: 0,
      size: initSize,
      current: 1
    })
  );
  // https://github.com/vuejs/vue-next/issues/2136
  const pagedTable = ref<T[]>([]) as Ref<T[]>;

  // method
  const reqPage = async (params: Partial<PageParam>) => {
    try {
      isLoadTable.value = true;
      const { data } = await reqFunction(params);
      const { records, size, total, current } = data;
      pagedTable.value = records;
      emit && emit("page-finish", data);
      return { size, total, current };
    } catch (error) {
      throw new Error(error);
    } finally {
      isLoadTable.value = false;
    }
  };
  const initPage = async () => {
    // console.log("init");
    // 初始化
    const routePageParam = new PageParamDTO({ size: initSize, ...route.query });
    const routeFilterParam = filterForm.value;
    const routeSearchParam = searchForm.value;
    // req
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { size, total, current } = await reqPage({
      ...routePageParam,
      ...routeFilterParam,
      ...routeSearchParam
    });
    pageOption.value = new PageOptionDTO({ size, total, current });
    if (isRoute) {
      router.replace({
        // 转为两个需要的字段
        // filter search 写入 route
        query: {
          ...routePageParam,
          ...routeFilterParam,
          ...routeSearchParam
        },
        hash: route.hash
      });
    }
  };
  const loadPage = async () => {
    // console.log("load");
    const routePageParam = new PageParamDTO(pageOption.value);
    const routeFilterParam = filterForm.value;
    const routeSearchParam = searchForm.value;
    // req
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { size, total, current } = await reqPage({
      ...routePageParam,
      ...routeFilterParam,
      ...routeSearchParam
    });
    pageOption.value = new PageOptionDTO({ size, total, current });
    if (isRoute) {
      router.replace({
        // 转为两个需要的字段
        // filter search 写入 route
        query: {
          ...routePageParam,
          ...routeFilterParam,
          ...routeSearchParam
        },
        hash: route.hash
      });
    }
  };
  // 筛选 handle
  const filterPage = async (row: GObj) => {
    // console.log("filterPage", row);
    filterForm.value = row;
    await initPage();
  };
  // 高级搜索 handle
  const searchPage = async (row: GObj) => {
    searchForm.value = row;
    // console.log("searchPage");
    await initPage();
  };

  // 分页操作不应该影响 search 与 filter 参数
  /**
   * 每页大小
   */
  const onSizeChange = (size: number) => {
    pageOption.value = {
      size,
      current: 1,
      total: pageOption.value.total
    };
    loadPage();
  };
  /**
   * 换页
   */
  const onCurrentChange = (current: number) => {
    pageOption.value.current = current;
    loadPage();
  };
  onMounted(() => {
    initPage();
  });

  return {
    // ref
    isLoadTable,
    pagedTable,
    filterForm,
    searchForm,
    pageOption,
    // method
    initPage,
    loadPage,
    filterPage,
    searchPage,
    onCurrentChange,
    onSizeChange
  };
}
