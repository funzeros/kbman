import { useClipboard } from "@vueuse/core";
import { gMessage } from "./useMessage";

export const gCopy = async (text: string, message = "ε€εΆζε") => {
  const { copy } = useClipboard();
  try {
    await copy(text);
    gMessage(message, "success");
  } catch (error) {
    console.log(error);
  }
};
