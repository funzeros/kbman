import { ref } from "vue";
import { gMessage, useGConfirm } from "./useMessage";

interface LoadPage {
  (): Promise<void> | void;
}

interface OperateRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (id: any): Promise<R<boolean>>;
}

export function useGOpt() {
  const gOptLoading = ref<boolean>(false);
  const gOpt = async (optAction: LoadPage) => {
    try {
      gOptLoading.value = true;
      await optAction();
    } catch (error) {
      console.log(error);
    } finally {
      gOptLoading.value = false;
    }
  };
  return {
    gOpt,
    gOptLoading
  };
}

export const useGOperate = () => {
  const { gConfirmBox } = useGConfirm();
  const gOptFnLoading = ref(false);
  /**
   * 单个操作函数
   * @param id 操作ID
   * @param reqFunction 操作函数
   * @param loadPage 回调函数
   * @param msg 操作名称
   * @param detailMsg 操作语重写
   * @param feedbackMsg 成功重写
   */
  const handleGOperate = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any,
    reqFunction: OperateRequest,
    loadPage: LoadPage,
    msg: string,
    detailMsg?: string,
    feedbackMsg?: string
  ) => {
    const res = await gConfirmBox(detailMsg || `是否${msg}`, "提示");
    if (res) {
      gOptFnLoading.value = true;
      const { data, msg: message } = await reqFunction(id);
      if (data) {
        gMessage(feedbackMsg || `${msg}成功!`, "success");
        loadPage();
      } else {
        gMessage(message);
      }
      gOptFnLoading.value = false;
    }
  };
  return {
    gOptFnLoading,
    handleGOperate
  };
};
