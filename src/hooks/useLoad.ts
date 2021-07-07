import { ref } from "vue";
import { ElLoading } from "element-plus";

interface LoadPage {
  (opt?: GObj): Promise<void> | void;
}
interface LoadFn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (opt?: any): Promise<any> | any;
}
export function useGLoad() {
  const gDataLoading = ref<boolean>(true);
  const gLoadPage = async (loadAction: LoadPage) => {
    try {
      gDataLoading.value = true;
      await loadAction();
    } catch (error) {
      console.log(error);
    } finally {
      gDataLoading.value = false;
    }
  };

  const gLoadingAction = async (
    loadAction: LoadFn,
    option?: GObj,
    params?: GObj
  ) => {
    let loadingInstance;
    try {
      loadingInstance = ElLoading.service(option);
      await loadAction(params);
    } catch (error) {
      console.log(error);
    } finally {
      loadingInstance?.close();
    }
  };
  return {
    gLoadPage,
    gDataLoading,
    gLoadingAction
  };
}
