import { useClipboard } from "@vueuse/core";
import { gMessage } from "./useMessage";

export const gCopy = async (text: string, message = "复制成功") => {
  const { copy } = useClipboard();
  try {
    await copy(text);
    gMessage(message, "success");
  } catch (error) {
    console.log(error);
  }
};
