import { ElMessage, ElMessageBox } from "element-plus";
import { ElMessageBoxOptions } from "element-plus/lib/el-message-box/src/message-box.type";
import { IMessageOptions } from "element-plus/lib/el-message/src/types";

enum ConfirmBoxRes {
  confirm = "confirm",
  cancel = "cancel",
  close = "close"
}

/**
 * gMessage
 * @param message 基本告知信息
 * @param type 默认灰色提示, 成功success绿色提示, 少量warning提示, 另外error警告提出
 * @param options 可填
 */
export const gMessage = (
  message: string,
  type: "success" | "warning" | "info" | "error" | "" = "info",
  options?: IMessageOptions
) => {
  const opt: IMessageOptions = options
    ? {
        message,
        type,
        ...options
      }
    : {
        message,
        type
      };
  ElMessage(opt);
};

export const useGConfirm = () => {
  /**
   * 确认框提示
   * @param message 提示信息
   * @param title 提示标题
   * @param options 复杂选项
   */
  const gConfirmBox = async (
    message: string,
    title: string,
    options?: ElMessageBoxOptions
  ) => {
    const opt: ElMessageBoxOptions = options ?? {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    };
    try {
      const value = await ElMessageBox.confirm(message, title, opt);
      return value;
    } catch (error) {
      console.warn("[useGConfirm]", "[gConfirmBox]", "取消操作", error);
      if (opt.distinguishCancelAndClose && error === "cancel") return error;
    }
  };
  /**
   * 小提示框确认
   * @param tip TIP信息
   */
  const gConfirmTip = (tip: string) => gConfirmBox(tip, "提示");
  return {
    gConfirmBox,
    gConfirmTip,
    ConfirmBoxRes
  };
};
